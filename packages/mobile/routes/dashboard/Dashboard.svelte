<script lang="typescript">
    import { Send, Receive } from './views'
    enum State {
        Init,
        Send,
        Receive,
    }

    let state: State = State.Init
</script>

<h1>Dashboard</h1>
{#if state === State.Init}
    <button on:click={() => (state = State.Send)}>Send</button>
    <button on:click={() => (state = State.Receive)}>Receive</button>
{:else if state === State.Send}
    <Send onClose={() => (state = State.Init)} />
{:else if state === State.Receive}
    <Receive onClose={() => (state = State.Init)} />
{/if}
