/* eslint-disable no-console */

import { WebSocketServer } from 'ws'
import { getOrInitWindow } from '../main'

const wss = new WebSocketServer({
    port: 5052,
})

wss.on('close', () => {
    console.log('[WebSocket Server] CLOSED')
})

wss.on('connection', (ws) => {
    console.log('[WebSocket Server] CONNECTION')

    ws.on('error', console.error)

    ws.on('message', (data, isBinary) => {
        console.log('[WebSocket Server] MESSAGE')
        console.log(isBinary, JSON.parse(data))
        getOrInitWindow('main').webContents.send('websocket-request', JSON.parse(data))
    })

    ws.send('something...')
})

wss.on('error', () => {
    console.log('[WebSocket Server] ERROR')
})
