<script lang="ts">
    import { Button, Text } from 'shared/components'
    import { errorLog } from '@core/error'
    import { localize } from '@core/i18n'
    import { closePopup } from '@desktop/auxiliary/popup'
    import { setClipboard } from '@core/utils'

    function onClearClick(): void {
        errorLog.set([])
        closePopup()
    }

    function onCopyClick(): void {
        const str = []

        for (const err of $errorLog) {
            str.push(new Date(err.time).toUTCString())
            str.push(`${err.type}: ${err.message}`)
            str.push('')
        }

        setClipboard(str.join('\r\n'))
    }
</script>

<div class="mb-5">
    <Text type="h4">{localize('popups.errorLog.title')}</Text>
</div>
<div class="log overflow-y-auto">
    {#if $errorLog.length > 0}
        {#each $errorLog as error}
            <div class="mb-7">
                <Text type="p" secondary>{new Date(error.time).toUTCString()}</Text>
                <Text type="p">
                    {error.type}:
                    {error.message}
                </Text>
            </div>
        {/each}
    {:else}
        <Text type="p" secondary>{localize('popups.errorLog.empty')}</Text>
    {/if}
</div>
{#if $errorLog.length > 0}
    <div class="flex w-full justify-center pt-8 space-x-4">
        <Button classes="w-1/2" onClick={onClearClick}>{localize('actions.clear')}</Button>
        <Button classes="w-1/2" onClick={onCopyClick}>{localize('actions.copy')}</Button>
    </div>
{/if}

<style type="text/scss">
    .log {
        max-height: 50vh;
        @screen md {
            max-height: 30vh;
        }
    }
</style>
