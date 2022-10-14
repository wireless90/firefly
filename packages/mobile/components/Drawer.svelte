<script lang="typescript">
    import { fade, fly } from 'svelte/transition'
    export let onClose: () => void

    let panelBottom = 0
    let moving = false
    let panelHeight
    let touchStartY

    function onTouchStart(event) {
        moving = true
        touchStartY = event.touches[0].pageY
    }

    function onTouchMove(event) {
        if (moving && event.targetTouches.length === 1) {
            const touchY = event.touches[0].pageY
            panelBottom = Math.min(touchStartY - touchY, 0)
        }
    }

    function onTouchEnd() {
        moving = false
        if (panelBottom < -panelHeight / 3) {
            onClose()
        } else {
            panelBottom = 0
        }
    }
</script>

<svelte:window on:touchend={onTouchEnd} on:touchmove={onTouchMove} />
<drawer class="fixed top-0 z-30">
    <overlay in:fade={{ duration: 300 }} out:fade={{ duration: 200 }} on:click={onClose} />
    <panel
        on:touchstart={onTouchStart}
        in:fly={{ y: 100, duration: 300 }}
        out:fly={{ y: 100, duration: 200 }}
        bind:clientHeight={panelHeight}
        class:moving
        style="bottom: {panelBottom}px;"
    >
        <slot />
    </panel>
</drawer>

<style type="text/scss">
    drawer {
        width: 100vh;
        height: 100vh;
        z-index: 30;
    }
    overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(100, 100, 100, 0.5);
        z-index: 2;
    }
    panel {
        min-height: 300px;
        position: fixed;
        width: 100%;
        height: fit-content;
        padding: 20px;
        display: flex;
        background: white;
        justify-content: center;
        background: white;
        z-index: 3;
        transition: transform 0.2s ease;
        overflow: auto;
        transition: bottom 0.2s ease;
        &.moving {
            transition: none;
        }
    }
</style>
