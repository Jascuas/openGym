import { readFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

const cfg = JSON.parse(readFileSync(new URL('../../android-release.json', import.meta.url)))
const capacitor = JSON.parse(readFileSync(new URL('../capacitor.config.json', import.meta.url)))
const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url)))
if (capacitor.appId !== cfg.applicationId || capacitor.appName !== cfg.appName || `${pkg.version}+${cfg.buildSuffix}` !== cfg.versionName) {
  throw new Error('Capacitor identity/frontend version differs from android-release.json')
}
const env = {
  ...process.env, VITE_MOBILE: '1', VITE_PERSONAL_ANDROID: '1', APP_BUILD: cfg.buildSuffix,
  VITE_IMG_BASE: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@7455efae41b330c265e7cd4b78dfa848e7ce5ebd/images/',
  VITE_GIF_BASE: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@7455efae41b330c265e7cd4b78dfa848e7ce5ebd/videos/'
}
for (const args of [['vite', 'build'], ['cap', 'sync', 'android']]) {
  const result = spawnSync('npx', ['--no-install', ...args], { env, stdio: 'inherit' })
  if (result.error) throw result.error
  if (result.status !== 0) process.exit(result.status || 1)
}
