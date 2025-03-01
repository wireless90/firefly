<script lang="ts">
    import features from '@features/features'
    import { ActivityAsyncStatus, ActivityDirection, getTimeDifference, Activity } from '@core/wallet'
    import { ActivityAsyncStatusPill, TooltipIcon, Text, Button, TileFooter, FontWeight, ButtonSize } from '@ui'
    import { time } from '@core/app'
    import { Icon as IconEnum } from '@lib/auxiliary/icon'
    import { Position } from '@ui/enums'
    import { localize } from '@core/i18n'

    export let onClaimClick: () => unknown = () => {}
    export let onRejectClick: () => unknown = () => {}
    export let activity: Activity

    $: shouldShowActions =
        activity.direction === ActivityDirection.Incoming &&
        activity.asyncData?.asyncStatus === ActivityAsyncStatus.Unclaimed &&
        features.dashboard.activity.actions.enabled
    $: shouldShowAsyncFooter = activity.asyncData?.asyncStatus !== ActivityAsyncStatus.Claimed

    $: timeDiff = getTimeDiff(activity)

    function getTimeDiff(activity: Activity): string {
        if (activity.asyncData) {
            const { asyncStatus, expirationDate, timelockDate } = activity.asyncData
            if (asyncStatus === ActivityAsyncStatus.Timelocked) {
                return getTimeDifference(timelockDate, $time)
            }
            if (asyncStatus !== ActivityAsyncStatus.Claimed && expirationDate) {
                return getTimeDifference(expirationDate, $time)
            }
        }
        return localize('general.none')
    }
</script>

{#if shouldShowAsyncFooter}
    <TileFooter>
        <svelte:fragment slot="left">
            <TooltipIcon
                icon={IconEnum.ExpirationTime}
                iconClasses="text-gray-600 dark:text-gray-200"
                title={localize('general.expirationTime')}
                text={localize(`tooltips.transactionDetails.${activity.direction}.expirationTime`)}
                position={Position.Top}
            />
            <Text fontSize="13" color="gray-600" fontWeight={FontWeight.semibold}>{timeDiff}</Text>
        </svelte:fragment>
        <svelte:fragment slot="right">
            {#if shouldShowActions}
                <Button
                    onClick={onRejectClick}
                    disabled={activity.asyncData?.isClaiming || activity.asyncData?.isRejected}
                    inlineStyle="min-width: 4rem;"
                    size={ButtonSize.Small}
                    outline
                >
                    {localize('actions.reject')}
                </Button>
                <Button
                    onClick={onClaimClick}
                    disabled={activity.asyncData?.isClaiming}
                    isBusy={activity.asyncData?.isClaiming}
                    inlineStyle="min-width: 4rem;"
                    size={ButtonSize.Small}
                >
                    {localize('actions.claim')}
                </Button>
            {:else}
                <ActivityAsyncStatusPill asyncStatus={activity.asyncData?.asyncStatus} />
            {/if}
        </svelte:fragment>
    </TileFooter>
{/if}
