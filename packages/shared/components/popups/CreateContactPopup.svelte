<script lang="typescript">
    import { showAppNotification } from '@auxiliary/notification'
    import { closePopup } from '@auxiliary/popup'
    import { createNewContact } from '@core/contact'
    import { localize } from '@core/i18n'
    import type { DestinationNetwork } from '@core/network'
    import { Button, FontWeight, NetworkInput, Text, TextInput } from 'shared/components'

    let name: string
    let address: string
    let nameInput: TextInput
    let addressInput: TextInput

    let network: DestinationNetwork

    function onCreate(): void {
        // Step 1: Validate form
        // TODO: Validate form

        // Step 2: Call create action
        createNewContact(name, network, address)
        closePopup()
        showAppNotification({
            type: 'success',
            alert: true,
            message: localize('notifications.createContact.success'),
        })
    }

    function onCancel(): void {
        closePopup()
    }
</script>

<create-contact-popup class="w-full h-full space-y-6 flex flex-auto flex-col flex-shrink-0">
    <Text type="h3" fontWeight={FontWeight.semibold} classes="text-left">
        {localize('popups.createContact.title')}
    </Text>
    <send-form-inputs class="flex flex-col space-y-4">
        <TextInput
            bind:this={nameInput}
            bind:value={name}
            label={localize('general.name')}
            placeholder={localize('general.name')}
        />
        <NetworkInput bind:network />
        <TextInput
            bind:this={addressInput}
            bind:value={address}
            label={localize('general.address')}
            placeholder={localize('general.address')}
        />
    </send-form-inputs>
    <popup-buttons class="flex flex-row flex-nowrap w-full space-x-4">
        <Button classes="w-full" outline onClick={onCancel}>
            {localize('actions.cancel')}
        </Button>
        <Button classes="w-full" onClick={onCreate}>
            {localize('actions.create')}
        </Button>
    </popup-buttons>
</create-contact-popup>
