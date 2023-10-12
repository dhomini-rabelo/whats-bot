import { WhatsAppListener } from './listener'

export abstract class WhatsAppProvider {
  constructor(private readonly listener: WhatsAppListener) { }

  abstract start(): void
}
