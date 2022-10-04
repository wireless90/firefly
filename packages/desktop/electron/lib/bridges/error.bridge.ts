import { contextBridge, ipcRenderer } from 'electron'
import { version } from '../../../package.json'

contextBridge.exposeInMainWorld('error', {
    getData(): void {
        void ipcRenderer.invoke('error-data').then((data) => ({
            iconPath: './assets/logos/firefly_logo.svg',
            version,
            diagnostics: data.diagnostics
                .map((d) => `${d.label.replace('popups.diagnostics.', '')}: ${d.value}`)
                .join('\r\n'),
            errorType: data.errorType,
            error: data.error,
        }))
    },
    openUrl(url: string): void {
        void ipcRenderer.invoke('open-url', url)
    },
})
