import { afterEach, describe, expect, it, vi } from 'vitest'

afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.resetModules() })

describe('Personal Android release isolation', () => {
  it('never queries or installs the upstream APK channel', async () => {
    vi.stubEnv('VITE_PERSONAL_ANDROID', '1')
    vi.resetModules()
    const fetch = vi.fn()
    vi.stubGlobal('fetch', fetch)
    const { checkForUpdate, downloadAndInstall } = await import('./update.js')
    expect(await checkForUpdate()).toMatchObject({ hasUpdate: false, apkUrl: null })
    await expect(downloadAndInstall('https://gitlab.com/official.apk')).rejects.toThrow('OpenGym Personal')
    expect(fetch).not.toHaveBeenCalled()
  })

  it('keeps automatic backups separate from the official installation', async () => {
    vi.stubEnv('VITE_PERSONAL_ANDROID', '1')
    vi.resetModules()
    const { AUTO_BACKUP_DIR } = await import('./mobile.js')
    expect(AUTO_BACKUP_DIR).toBe('OpenGymPersonal')
  })
})
