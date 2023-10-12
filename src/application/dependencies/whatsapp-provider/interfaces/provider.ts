import { IWhatsAppListener } from './listener'

export abstract class WhatsAppProvider {
  constructor(protected readonly listener: IWhatsAppListener) { } // prettier-ignore

  abstract start(): Promise<void>
}
