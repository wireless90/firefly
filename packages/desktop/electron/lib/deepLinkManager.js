const { ipcRenderer } = require('electron')

/** Deep link manager  */
// Runs in renderer process
const DeepLinkManager = {
    checkDeepLinkRequestExists: () => {
        console.log('IPC RENDERER send')
        ipcRenderer.send('check-deep-link-request-exists')
    },
    clearDeepLinkRequest: () => {
        console.log('DEEP Link has been cleared')
        ipcRenderer.send('clear-deep-link-request')
    },
}

module.exports = DeepLinkManager
