<script lang="ts">
    import { DeveloperIndicatorPill, Icon, NetworkIconBadge, StrongholdBadge, Text, TextType, Tooltip } from '@ui'
    import { Position } from '@ui/enums'

    import { IPersistedProfile, ProfileType } from '@core/profile'
    import { getInitials as _getInitials } from '@core/utils'

    import { Icon as IconEnum } from '@auxiliary/icon/enums'

    export let profile: IPersistedProfile = undefined
    export let classes: string = undefined
    export let bgColor: string = ''
    export let updateRequired: boolean = false
    export let truncate: boolean = false

    export let onClick: undefined | ((profileId: string) => void) = undefined

    const slots = $$props.$$slots

    const position: Position = Position.Right
    let anchor: HTMLElement
    let isTooltipVisible = false

    function showTooltip(show: boolean): void {
        if (truncate) {
            isTooltipVisible = show
        }
    }

    function onProfileClick(): void {
        onClick && onClick(profile?.id)
    }

    function getInitials(): string {
        const initials = _getInitials(profile.name, 1)
        if (initials.length === 1) {
            return initials
        } else {
            const letters = initials.split('')
            return letters[0] + letters[letters.length - 1]
        }
    }
</script>

<profile-container class="flex items-center justify-center {truncate ? 'w-24' : ''}">
    <div class="flex flex-col justify-between items-center w-full">
        <button type="button" on:click={onProfileClick} class="relative cursor-pointer mb-3">
            <div
                class="h-18 w-18 rounded-full font-bold text-center flex items-center justify-center
                {bgColor ? `bg-${bgColor}-500` : ''} {classes}"
            >
                {#if slots}
                    <slot />
                {:else}
                    <Text type={TextType.h3} classes="text-white">{getInitials()}</Text>
                {/if}
            </div>
            {#if !updateRequired}
                <NetworkIconBadge network={profile?.network} />
            {:else}
                <StrongholdBadge />
            {/if}
        </button>
        <div class="flex flex-row items-baseline justify-center space-x-1.5 mb-2 w-full">
            {#if profile?.type === ProfileType.Ledger}
                <Icon
                    icon={IconEnum.Ledger}
                    classes="text-gray-900 dark:text-gray-100 relative top-0.5"
                    width={14}
                    height={14}
                />
            {/if}
            {#if profile?.name}
                <div
                    class="max-w-full"
                    bind:this={anchor}
                    on:mouseenter={() => showTooltip(true)}
                    on:mouseleave={() => showTooltip(false)}
                >
                    <Text type={TextType.h5} classes="text-center {truncate ? 'truncate' : ''}">{profile?.name}</Text>
                </div>
            {/if}
        </div>
        {#if profile?.isDeveloperProfile}
            <DeveloperIndicatorPill />
        {/if}
        {#if isTooltipVisible}
            <Tooltip {anchor} {position} size="small"><Text>{profile?.name}</Text></Tooltip>
        {/if}
    </div>
</profile-container>
