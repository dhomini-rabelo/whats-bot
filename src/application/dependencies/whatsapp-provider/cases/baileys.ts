import makeWASocket, {
  ConnectionState,
  DisconnectReason,
  useMultiFileAuthState,
} from '@whiskeysockets/baileys'
import { WhatsAppProvider } from '../interfaces/provider'
import { Boom } from '@hapi/boom'

export class BailyesWhatsAppProvider extends WhatsAppProvider {
  private readonly _CREDENTIALS_FOLDER = 'tokens'

  async start() {
    const { socket, saveCreds } = await this._connect()
    socket.ev.on('creds.update', saveCreds)
    socket.ev.on('connection.update', this._reconnect)
    socket.ev.on('messages.upsert', async (body) => {
      const messageBody = body.messages[0]
      console.log(JSON.stringify(messageBody, undefined, 2))
      const senderId = messageBody.key.remoteJid
      if (messageBody.key.fromMe === false && typeof senderId === 'string') {
        this.listener.onMessage(
          {
            text: messageBody.message?.conversation || '',
            contact: {
              name: messageBody.pushName || '',
              phone: senderId,
            },
            timestamp: messageBody.messageTimestamp
              ? String(messageBody.messageTimestamp)
              : '',
          },
          {
            withText: async (text: string) => {
              await socket.sendMessage(senderId, { text })
            },
          },
        )
      }
    })
  }

  private async _connect() {
    const { state, saveCreds } = await useMultiFileAuthState(
      this._CREDENTIALS_FOLDER,
    )

    return {
      socket: makeWASocket({
        auth: state,
        printQRInTerminal: true,
      }),
      saveCreds,
    }
  }

  private _reconnect(update: Partial<ConnectionState>) {
    const { connection, lastDisconnect } = update
    console.log(update)
    if (connection === 'close' && lastDisconnect) {
      const shouldReconnect =
        (lastDisconnect.error as Boom)?.output?.statusCode !==
        DisconnectReason.loggedOut
      if (shouldReconnect) {
        this.start()
      }
    } else if (connection === 'open') {
      console.log('opened connection')
    }
  }
}
