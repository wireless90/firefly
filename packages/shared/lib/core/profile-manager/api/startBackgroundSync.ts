import { profileManager } from '@core/profile-manager'
import { isBackgroundSyncing } from '@lib/wallet'
import { showAppNotification } from 'shared/lib/notifications'
import { localize } from '@core/i18n'
import { get } from 'svelte/store'

export async function startBackgroundSync(): Promise<void> {
    if (!get(isBackgroundSyncing)) {
        try {
            await get(profileManager).startBackgroundSync({}, 30)
            isBackgroundSyncing.set(true)
        } catch (err) {
            showAppNotification({
                type: 'error',
                message: localize('error.account.syncing'),
            })
        }
    }
}
