# OpenGym Personal

This source fork starts at official v1.3.9. Preserve upstream training, pairing,
authentication and persistence behavior. Android identity and release metadata
belong to android-release.json. Keep io.github.jascuas.opengym and its release
certificate stable. Increase versionCode for every installed release.

Build and publish APKs through personal-android.yml. Signing is allowed only on
reviewed android-v* tags pointing into main. Pull requests never receive the
production signing key. Never commit keystores, passwords, personal configuration,
workouts, production data or APK binaries. The release output is ignored.

The first release uses manual GitHub downloads. Do not enable the official GitLab
updater in the Personal build. Verify the first side-by-side installation and a
later in-place update on the user's phone before adding an in-app channel.

Tensor remains on official images for the baseline APK. Its private deployment
repository owns release admission/configuration. A custom web image transition
requires its own reviewed source/image policy; publishing this APK does not
authorize a Tensor deployment or automatic upstream overwrite.

Run frontend tests and web/mobile builds. The Android release workflow verifies
package, version, certificate and APK checksum before publishing. Keep original
license/notices and offer the exact modified source alongside released binaries.
