<script lang="ts">
    import {
        CreateAliasButton,
        FaucetRequestButton,
        ImportErc20TokenButton,
        MintNativeTokenButton,
        MintNftButton,
        RefreshTokenMetadataButton,
        TestDeepLinkButton,
    } from '@components'
    import { Pane, Text, TextType } from '@ui'

    import features from '@features/features'

    import { selectedAccount } from '@core/account/stores'
    import { localize } from '@core/i18n'
</script>

{#if $selectedAccount}
    <div
        class="w-full h-full flex flex-nowrap p-8 relative flex-1 bg-gray-50 dark:bg-gray-900 justify-center items-start"
    >
        {#key $selectedAccount?.index}
            <div class="flex columns-3 gap-4 min-h-0 min-w-0 max-w-7xl">
                <Pane classes="flex flex-col p-6 space-y-6">
                    <Text type={TextType.h5} classes="text-left">
                        {localize('general.assets')}
                    </Text>
                    {#if features.developerTools.alias.enabled}
                        <CreateAliasButton />
                    {/if}
                    {#if features.developerTools.mintNativeTokens.enabled}
                        <MintNativeTokenButton />
                    {/if}
                    {#if features.developerTools.mintNft.enabled}
                        <MintNftButton />
                    {/if}
                    {#if features.developerTools.importErc20Token.enabled}
                        <ImportErc20TokenButton />
                    {/if}
                </Pane>
                <Pane classes="flex flex-col p-6 space-y-6">
                    <Text type={TextType.h5} classes="text-left">
                        {localize('general.developerTools')}
                    </Text>
                    {#if features.developerTools.faucet.enabled}
                        <FaucetRequestButton />
                    {/if}
                    {#if features.developerTools.deeplink.enabled}
                        <TestDeepLinkButton />
                    {/if}
                    {#if features.developerTools.refreshTokens.enabled}
                        <RefreshTokenMetadataButton />
                    {/if}
                </Pane>
            </div>
        {/key}
    </div>
{/if}
