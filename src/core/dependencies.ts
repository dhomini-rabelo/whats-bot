import { BailyesWhatsAppProvider } from '../application/dependencies/whatsapp-provider/cases/baileys'
import { WhatsAppProvider } from '../application/dependencies/whatsapp-provider/interfaces/provider'
import { WhatsAppListener } from '../contexts/messages/listener'

export const whatsAppProvider: WhatsAppProvider = new BailyesWhatsAppProvider(
  new WhatsAppListener(),
)
