<script lang="ts">
    import { onMount } from 'svelte'
    import { Button, Error, FontWeight, OptionalInput, Text, TextInput, TextType, TooltipIcon } from 'shared/components'
    import { closePopup, openPopup, PopupId } from '@auxiliary/popup'
    import { BaseError } from '@core/error/classes'
    import { handleError } from '@core/error/handlers/handleError'
    import { localize } from '@core/i18n'
    import { MimeType } from '@core/nfts/types'
    import { isValidUri } from '@core/utils/validation'
    import { OutputType, TokenStandard } from '@core/wallet/enums'
    import { mintNftDetails, setMintNftDetails } from '@core/wallet/stores'
    import { IMintNftDetails } from '@core/wallet'
    import { fetchWithTimeout } from '@core/nfts/utils/fetchWithTimeout'
    import { composeUrlFromNftUri } from '@core/nfts'
    import { HttpHeader } from '@core/utils'

    export let _onMount: (..._: any[]) => Promise<void> = async () => {}

    let { standard, version, type, uri, name, issuerName, description } = $mintNftDetails.metadata

    enum OptionalInputId {
        IssuerName = 'issuerName',
        Description = 'description',
    }

    type OptionalInputs = {
        [key in OptionalInputId]: {
            inputType: 'text' | 'number'
            isInteger?: boolean
            value: string
            error: string
            isOpen?: boolean
        }
    }

    const optionalInputs: OptionalInputs = {
        issuerName: {
            inputType: 'text',
            value: issuerName,
            error: '',
        },
        description: {
            inputType: 'text',
            value: description,
            error: '',
        },
    }

    let uriError: string, nameError: string

    const error: BaseError = null

    function onCancelClick(): void {
        closePopup()
    }

    async function onContinueClick(): Promise<void> {
        resetErrors()
        const valid = await validate()
        if (valid) {
            setMintNftDetails(convertInputsToMetadataType())
            openPopup({
                id: PopupId.MintNftCollectionConfirmation,
                overflow: true,
            })
        }
    }

    async function validate(): Promise<boolean> {
        if (name.length === 0) {
            nameError = localize('popups.mintNftForm.errors.emptyName')
        }

        if (uri.length === 0 || !isValidUri(uri)) {
            uriError = localize('popups.mintNftForm.errors.invalidURI')
        } else {
            try {
                const response = await fetchWithTimeout(composeUrlFromNftUri(uri), 1, { method: 'HEAD' })
                if (response.status === 200 || response.status === 304) {
                    type = response.headers.get(HttpHeader.ContentType) as MimeType
                } else {
                    uriError = localize('popups.mintNftForm.errors.notReachable')
                }
            } catch (err) {
                uriError = localize('popups.mintNftForm.errors.notReachable')
            }
        }

        const optionalInputsErrors = Object.values(optionalInputs).map((optionalInput) => optionalInput.error)

        const hasErrors = Object.values({ ...optionalInputsErrors, nameError, uriError }).some((e) => e !== '')

        return !hasErrors
    }

    function resetErrors(): void {
        nameError = ''
        uriError = ''

        for (const key of Object.keys(optionalInputs)) {
            optionalInputs[key].error = ''
        }
    }

    function convertInputsToMetadataType(): IMintNftDetails {
        return {
            outputType: OutputType.Alias,
            metadata: {
                standard: standard ?? TokenStandard.Irc27,
                version,
                type: type as MimeType,
                uri,
                name,
                issuerName: optionalInputs.issuerName?.value,
                description: optionalInputs.description?.value,
            },
            quantity: 1,
        }
    }

    onMount(async () => {
        try {
            await _onMount()
        } catch (err) {
            handleError(err)
        }
    })
</script>

<div class="space-y-6">
    <Text type={TextType.h4} fontSize="18" lineHeight="6" fontWeight={FontWeight.semibold}>Mint collection NFT</Text>

    <popup-inputs class="block space-y-4 max-h-100 scrollable-y overflow-x-hidden flex-1">
        <TextInput
            bind:value={uri}
            bind:error={uriError}
            label={localize('general.uri')}
            placeholder={localize('general.uri')}
        >
            <TooltipIcon
                slot="right"
                text={localize('tooltips.mintNftForm.uri')}
                title={localize('general.uri')}
                width={15}
                height={15}
                classes="ml-1 flex items-center"
            />
        </TextInput>
        <TextInput
            bind:value={name}
            bind:error={nameError}
            label={localize('general.name')}
            placeholder={localize('general.name')}
        />
        <optional-inputs class="flex flex-row flex-wrap gap-4">
            {#each Object.keys(optionalInputs) as key}
                <OptionalInput
                    bind:value={optionalInputs[key].value}
                    bind:error={optionalInputs[key].error}
                    bind:isOpen={optionalInputs[key].isOpen}
                    inputType={optionalInputs[key].inputType}
                    isInteger={optionalInputs[key]?.isInteger}
                    label={localize(`general.${key}`)}
                    description={localize(`tooltips.mintNftForm.${key}`)}
                    fontSize={14}
                />
            {/each}
        </optional-inputs>
        {#if error}
            <Error error={error?.message} />
        {/if}
    </popup-inputs>
    <popup-buttons class="flex flex-row flex-nowrap w-full space-x-4">
        <Button outline classes="w-full" onClick={onCancelClick}>
            {localize('actions.cancel')}
        </Button>
        <Button classes="w-full" onClick={onContinueClick}>
            {localize('actions.continue')}
        </Button>
    </popup-buttons>
</div>
