<script lang="ts">
    import { OnboardingButton } from '@ui'

    import { localize } from '@core/i18n'
    import { refreshAccountAssetsForActiveProfile } from '@core/wallet'

    import { showAppNotification } from '@auxiliary/notification'
    import { closePopup, openPopup, PopupId } from '@desktop/auxiliary/popup'

    function refreshTokenMetadata(): void {
        refreshAccountAssetsForActiveProfile(true)
        showAppNotification({
            type: 'success',
            message: localize('notifications.refreshTokenMetadata.success'),
            alert: true,
        })
        closePopup()
    }

    function onRefreshTokenMetadataClick(): void {
        openPopup({
            id: PopupId.Confirmation,
            props: {
                title: localize('actions.refreshTokenMetadata'),
                hint: localize('general.refreshTokenMetadataHint'),
                warning: true,
                confirmText: localize('actions.reset'),
                onConfirm: refreshTokenMetadata,
            },
        })
    }
</script>

<OnboardingButton
    primaryText={localize('actions.refreshTokenMetadata')}
    secondaryText={localize('general.refreshTokenMetadataDescription')}
    onClick={onRefreshTokenMetadataClick}
/>
