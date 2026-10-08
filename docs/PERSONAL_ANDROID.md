# OpenGym Personal Android releases

Public downloads: https://github.com/Jascuas/openGym/releases

This repository preserves the upstream history and AGPL license and starts at
official v1.3.9 (`e6c920eb0a657e57139798f60da40c934aec9301`). Tensor remains on
the matching official server. APK publication and server deployment are separate.

## Download and migration

1. In the official app, finish syncing and export a backup including media.
2. In your phone browser, open Releases and download `openGym-Personal.apk`.
   Open it; permit installation from that browser when Android asks.
3. Open **OpenGym Personal**, whose cyan dumbbell/gold P icon distinguishes it.
   Pair it to the same profile using the authenticated Tensor web app's pairing
   code. Pairing preserves the server profile; the app has separate local storage.
4. Check routines, workout history, photos/videos and both directions of sync.
   Verify notifications/permissions on the new app and complete one real workout.
   Confirm that workout appears in the web profile.
5. Keep the official app until a later Personal APK updates this installation
   successfully with its data intact. Install future APKs over **Personal**.

Guest-only data must be exported/imported into the new app. A backup import may
replace profile data: do not import into an already synced server profile simply
to migrate clients. Automatic backups use `Documents/OpenGymPersonal` instead of
the official app's `Documents/openGym`.

## Build and publication

`android-release.json` is the release metadata. Keep application ID
`io.github.jascuas.opengym` and the certificate SHA-256 stable. Increase versionCode
for every installed release; edit versionName/releaseVersion/buildSuffix together.
The Capacitor app ID/name must match this file. The Java namespace deliberately
stays upstream to preserve native plugin resolution.

On main and PRs, Personal Android runs frontend tests, builds the browser and
bundled mobile frontend, and builds an unsigned APK on Linux. Actions artifacts
expire after seven days and are previews; use Releases for installed builds.
There is no automatic publication on ordinary main pushes.

To release reviewed main code, create and push `android-v<releaseVersion>` at that
commit. The tag-triggered workflow verifies metadata and main ancestry, signs,
checks package/version/certificate, then publishes these three assets:

- `openGym-Personal.apk`
- `openGym-Personal.apk.sha256`
- `release.json` (exact source SHA, certificate fingerprint and APK digest)

The workflow rejects a changed signing certificate and mismatched release tag.
It will not overwrite an existing release. Check Actions, then download from
Releases. Verify with `sha256sum --check openGym-Personal.apk.sha256` on Linux or
`shasum -a 256 -c openGym-Personal.apk.sha256` on macOS. The built APK targets ARM
phones and Android API 23+, with target/compile API 35.

Local build: Node 22, Java 21 and Android SDK 35 are required. Run `npm ci
--ignore-scripts`, `npm test`, `npm run build:mobile` in frontend, then
`./gradlew assembleRelease` in frontend/android. That output is unsigned. Only a
signed release from the permanent key can update an installed Personal app.

## Signing recovery

Repository secrets are `ANDROID_KEYSTORE_B64`, `ANDROID_KEYSTORE_PASSWORD` and
`ANDROID_KEY_ALIAS`. Never put their values or a keystore into source, Actions
artifacts or release assets. PR verification does not receive these secrets.
The fingerprint is public, pinned in android-release.json.

Keep an encrypted keystore and its password in independent protected backups.
The GitHub secrets interface cannot return stored values; it is not a backup.
Loss of the signing key prevents normal in-place upgrades. Restoring release
signing means recovering the original keystore/password, confirming its public
certificate fingerprint, and replacing the repository secrets with those values.

The official updater is disabled for Personal. A Personal in-app update channel
is deferred until both side-by-side migration and one in-place update succeed.
Custom Tensor web images require a separate reviewed source/image admission
change in the private deployment repository.
