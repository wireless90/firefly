<script lang="typescript">
    import { Button, Input, Text } from 'shared/components'
    import { localize } from '@core/i18n'
    import { showAppNotification } from 'shared/lib/notifications'
    import { activeProfile, updateActiveProfileSettings, validateExplorerUrl, validateProfileName } from '@core/profile'

    let newUrl = $activeProfile?.settings.explorerUrl
    let error = ''

    $: trimmedUrl = newUrl?.trim()
    $: newUrl, (error = '')

    function handleSubmit(): void {
        try {
            validateExplorerUrl(trimmedUrl)
            updateActiveProfileSettings({ explorerUrl: trimmedUrl })
            showAppNotification({
                type: 'info',
                message: localize('views.settings.explorerUrl.success'),
            })
        } catch (err) {
            return (error = err.message)
        }
    }
</script>

<div>
    <Text type="h4" classes="mb-3">
        {localize('views.settings.explorerUrl.title')}
    </Text>
    <Text type="p" secondary classes="mb-5">
        {localize('views.settings.explorerUrl.description')}
    </Text>
    <Input {error} placeholder={$activeProfile?.settings?.explorerUrl} bind:value={newUrl} classes="mb-5" />
    <Button medium onClick={handleSubmit}>
        {localize('views.settings.explorerUrl.title')}
    </Button>
</div>
