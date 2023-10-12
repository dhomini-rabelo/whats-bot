import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
} from '@whiskeysockets/baileys'
import { Boom } from '@hapi/boom'

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState('tokens')

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update
    if (connection === 'close' && lastDisconnect) {
      const shouldReconnect =
        (lastDisconnect.error as Boom)?.output?.statusCode !==
        DisconnectReason.loggedOut
      console.log(
        'connection closed due to ',
        lastDisconnect.error,
        ', reconnecting ',
        shouldReconnect,
      )
      // reconnect if not logged out
      if (shouldReconnect) {
        connectToWhatsApp()
      }
    } else if (connection === 'open') {
      console.log('opened connection')
    }
  })
  sock.ev.on('messages.upsert', async (m) => {
    console.log(JSON.stringify(m, undefined, 2))

    console.log('replying to', m.messages[0].key.remoteJid)
    if (m.messages[0].key.fromMe === true) return

    await sock.sendMessage(m.messages[0].key.remoteJid!, {
      text: 'Hello ',
    })
  })
}

connectToWhatsApp()
