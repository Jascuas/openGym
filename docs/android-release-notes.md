OpenGym Personal is a source fork based on official OpenGym v1.3.9.

Download **openGym-Personal.apk** from Assets below using your phone's browser,
then open the download and allow that browser to install apps when Android asks.
This ARM APK supports Android 6.0 and newer. It installs alongside official
OpenGym as **OpenGym Personal**, with its own icon, storage and automatic-backup
folder. No personal server address, credentials or workout data are included.

Before migration, sync the official app and export a backup (including media).
Pair Personal to your existing Tensor profile from the authenticated web app.
Check routines, history and media, then complete a real workout and verify that
it appears on the web. Keep the official app until a later Personal update has
also installed successfully. Guest data needs a backup/import rather than pairing.
Do not import a backup over a synced server profile just to migrate clients.

Updates are manual through this repository's Releases page. This release does
not contact or install the official GitLab APK channel. Future Personal releases
use the same app ID and signing certificate and a higher Android versionCode.

The accompanying `.sha256` file verifies the download; `release.json` records
the package/version, signing certificate and exact source commit. GitHub's source
archives and the source commit referenced there provide the corresponding AGPL
source. See [the release guide](https://github.com/Jascuas/openGym/blob/main/docs/PERSONAL_ANDROID.md).
