#!/usr/bin/env python3
"""Verify a signed release against public metadata; emit its download manifest."""
import hashlib
import json
import pathlib
import re
import subprocess
import sys

root = pathlib.Path(__file__).resolve().parents[1]
config = json.loads((root / 'android-release.json').read_text())
apk, build_tools = map(pathlib.Path, sys.argv[1:3])
source = subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=root, text=True).strip()
badging = subprocess.check_output([str(build_tools / 'aapt'), 'dump', 'badging', str(apk)], text=True)
package = re.search(r"package: name='([^']+)' versionCode='([^']+)' versionName='([^']+)'", badging)
expected = (config['applicationId'], str(config['versionCode']), config['versionName'])
if not package or package.groups() != expected:
    raise SystemExit('APK identity/version differs from android-release.json')
certificate = subprocess.check_output([str(build_tools / 'apksigner'), 'verify', '--verbose', '--print-certs', str(apk)], text=True)
fingerprints = re.findall(r'Signer #\d+ certificate SHA-256 digest: ([a-fA-F0-9]+)', certificate)
if fingerprints != [config['certificateSha256']]:
    raise SystemExit('APK release signing certificate does not match the permanent certificate')
sha = hashlib.sha256(apk.read_bytes()).hexdigest()
apk.with_suffix('.apk.sha256').write_text(f'{sha}  {apk.name}\n')
manifest = {
    'applicationId': config['applicationId'], 'appName': config['appName'],
    'versionName': config['versionName'], 'versionCode': config['versionCode'],
    'tag': 'android-v' + config['releaseVersion'], 'source': source,
    'sourceUrl': f"https://github.com/{config['repository']}/tree/{source}",
    'upstreamSource': config['upstreamSource'],
    'certificateSha256': config['certificateSha256'],
    'apk': apk.name, 'sha256': sha, 'bytes': apk.stat().st_size,
}
(apk.parent / 'release.json').write_text(json.dumps(manifest, indent=2) + '\n')
print(json.dumps(manifest, indent=2))
