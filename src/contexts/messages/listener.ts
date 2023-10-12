import {
  IOnMessageData,
  IReplier,
  IWhatsAppListener,
} from '../../application/dependencies/whatsapp-provider/interfaces/listener'

export class WhatsAppListener implements IWhatsAppListener {
  async onMessage(data: IOnMessageData, reply: IReplier) {
    console.log(`received message: ${data.text}`)
    await reply.withText('Hello')
  }
}
