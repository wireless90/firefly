<script lang="ts">
    import { OnboardingButton } from '@ui'

    import { selectedAccount } from '@core/account'
    import { localize } from '@core/i18n'
    import { resetMintTokenDetails } from '@core/wallet'

    import { closePopup, openPopup, PopupId } from '@desktop/auxiliary/popup'

    $: hasAliases = $selectedAccount.balances?.aliases.length > 0

    function onMintNativeTokenClick(): void {
        resetMintTokenDetails()
        if (hasAliases) {
            openPopup({
                id: PopupId.MintNativeTokenForm,
            })
        } else {
            openPopup({
                id: PopupId.Confirmation,
                props: {
                    title: localize('popups.noAlias.title'),
                    hint: localize('popups.noAlias.description'),
                    warning: true,
                    confirmText: localize('actions.createAlias'),
                    onConfirm: () => {
                        closePopup()
                        openPopup({
                            id: PopupId.AliasConfirmation,
                        })
                    },
                },
            })
        }
    }
</script>

<OnboardingButton
    primaryText={localize('actions.mintNativeToken')}
    secondaryText={localize('general.mintNativeTokenDescription')}
    onClick={onMintNativeTokenClick}
/>
