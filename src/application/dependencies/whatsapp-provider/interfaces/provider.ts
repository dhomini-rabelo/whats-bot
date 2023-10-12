import { WhatsAppListener } from './listener'

export abstract class WhatsAppProvider {
  constructor(protected readonly listener: WhatsAppListener) { }

  abstract start(): Promise<void>
}
