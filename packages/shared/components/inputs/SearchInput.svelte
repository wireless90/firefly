<script lang="ts">
    import { TextInput, Icon, TogglableButton, FontWeight } from 'shared/components'
    import { localize } from '@core/i18n'
    import { debounce } from '@core/utils'

    export let value: string

    let searchValue = ''
    let searchActive: boolean = false
    let inputElement: HTMLInputElement

    $: debounce(() => {
        value = searchValue
    })()
</script>

{#if searchActive}
    <TextInput
        bind:inputElement
        bind:value={searchValue}
        hasFocus={true}
        placeholder={localize('general.search')}
        fontSize="15"
        clearPadding
        containerClasses="py-2 px-3"
        fontWeight={FontWeight.medium}
        color="gray-500"
    >
        <Icon slot="left" icon="search" classes="mr-2 text-gray-500 dark:text-white" />
        <button on:click={() => (searchActive = false)} slot="right">
            <Icon
                icon="close"
                classes="cursor-pointer ml-2 text-gray-500 dark:text-white hover:text-gray-600 dark:hover:text-gray-200"
            />
        </button>
    </TextInput>
{:else}
    <TogglableButton icon="search" bind:active={searchActive} />
{/if}
