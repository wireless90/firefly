import { contextBridge, ipcRenderer } from 'electron'
import { version, productName } from '../../../package.json'
import { MenuEvent } from '../menu'

contextBridge.exposeInMainWorld('about', {
    getData(): void {
        void ipcRenderer.invoke(MenuEvent.Data).then((data) => ({
            appName: productName,
            version: data.strings.version.replace('{version}', version),
            iconPath: `./assets/logos/darkmode/${process.env.STAGE}_firefly_logo.svg`,
        }))
    },
})
