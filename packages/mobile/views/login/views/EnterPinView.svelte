<script lang="ts">
    import { onDestroy } from 'svelte'

    import { PinInput } from '@components'
    import { Icon, Profile, Text, TextType } from '@ui'

    import { needsToAcceptLatestPrivacyPolicy, needsToAcceptLatestTermsOfService, Platform } from '@core/app'
    import { localize } from '@core/i18n'
    import { activeProfile, login, resetActiveProfile } from '@core/profile'
    import { isValidPin } from '@core/utils'

    import { Icon as IconEnum } from '@auxiliary/icon'

    import { DrawerId, drawers, openDrawer } from '@/auxiliary/drawer'
    import { loginRouter } from '@/routers'

    let attempts = 0
    let pinCode = ''
    let isBusy = false
    let pinRef
    let shake = false

    /** Maximum number of consecutive (incorrect) attempts allowed to the user */
    const MAX_PINCODE_INCORRECT_ATTEMPTS = 3

    /** Waiting time in seconds after which a user should be allowed to enter pin again */
    const WAITING_TIME_AFTER_MAX_INCORRECT_ATTEMPTS = 30

    let timeRemainingBeforeNextAttempt = WAITING_TIME_AFTER_MAX_INCORRECT_ATTEMPTS

    $: if (needsToAcceptLatestPrivacyPolicy() || needsToAcceptLatestTermsOfService()) {
        openDrawer(DrawerId.LegalUpdate, { preventClose: true })
    }

    $: hasReachedMaxAttempts = attempts >= MAX_PINCODE_INCORRECT_ATTEMPTS
    $: {
        if (isValidPin(pinCode)) {
            void onSubmitClick()
        }
    }
    $: {
        if (pinRef && !$drawers?.length) {
            pinRef.focus()
        }
    }

    let buttonText = setButtonText(timeRemainingBeforeNextAttempt)

    function setButtonText(time: number): string {
        return localize('views.login.pleaseWait', { values: { time: time.toString() } })
    }

    let maxAttemptsTimer = null
    let shakeTimeout = null

    function countdown(): void {
        if (!hasReachedMaxAttempts) {
            return
        }

        if (timeRemainingBeforeNextAttempt === -1) {
            clearInterval(maxAttemptsTimer)
            attempts = 0
            timeRemainingBeforeNextAttempt = WAITING_TIME_AFTER_MAX_INCORRECT_ATTEMPTS
            pinRef.resetAndFocus()
        } else {
            buttonText = setButtonText(timeRemainingBeforeNextAttempt)
            timeRemainingBeforeNextAttempt--
        }
    }

    async function onSubmitClick(): Promise<void> {
        if (!hasReachedMaxAttempts) {
            isBusy = true
            const isVerified = await Platform.PincodeManager.verify($activeProfile?.id, pinCode)
            if (isVerified) {
                void login()
                $loginRouter.next()
            } else {
                shake = true
                shakeTimeout = setTimeout(() => {
                    shake = false
                    isBusy = false
                    attempts++
                    if (attempts >= MAX_PINCODE_INCORRECT_ATTEMPTS) {
                        clearInterval(maxAttemptsTimer)
                        maxAttemptsTimer = setInterval(countdown, 1000)
                    } else {
                        pinRef.resetAndFocus()
                    }
                }, 1000)
            }
        }
    }

    function onBackClick(): void {
        if (!hasReachedMaxAttempts) {
            resetActiveProfile()
            $loginRouter.previous()
        }
    }

    onDestroy(() => {
        clearInterval(maxAttemptsTimer)
        clearTimeout(shakeTimeout)
    })
</script>

<div class="relative h-full p-5 flex flex-col">
    <header class="relative w-full flex justify-center">
        <Text type={TextType.h4} classes="text-center">{localize('general.profiles')}</Text>
        <button
            data-label="back-button"
            class="absolute left-0"
            disabled={hasReachedMaxAttempts}
            on:click={onBackClick}
        >
            <Icon icon={IconEnum.ArrowLeft} classes="text-gray-500 dark:text-gray-100" />
        </button>
    </header>
    <div class="flex w-full justify-center items-center mt-16">
        <div class="flex flex-col items-center w-96">
            <Profile profile={$activeProfile} bgColor="blue" />
            <div class="flex w-full items-center mt-12">
                <PinInput
                    bind:this={pinRef}
                    bind:value={pinCode}
                    classes={shake && 'animate-shake'}
                    disabled={hasReachedMaxAttempts || isBusy}
                    autofocus
                />
            </div>
            <Text type={TextType.p} bold classes="text-center mt-4">
                {attempts > 0
                    ? localize('views.login.incorrectAttempts', {
                          values: { attempts: attempts.toString() },
                      })
                    : localize('actions.enterYourPin')}
            </Text>
            {#if hasReachedMaxAttempts}
                <Text error classes="mt-6">{buttonText}</Text>
            {/if}
        </div>
    </div>
</div>
