import {
  IOnMessageData,
  IWhatsAppListener,
} from '../../application/dependencies/whatsapp-provider/interfaces/listener'

export class WhatsAppListener implements IWhatsAppListener {
  onMessage(data: IOnMessageData) {
    console.log(`received message: ${data.text}`)
  }
}
