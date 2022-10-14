<script lang="typescript">
    import { logout } from '@core/profile'
    import { Drawer } from '../../../components'
    export let onClose

    function customOnClose(): void {
        onClose()
        void logout()
    }
</script>

<Drawer onClose={customOnClose}>
    <h1>Send</h1>
</Drawer>
