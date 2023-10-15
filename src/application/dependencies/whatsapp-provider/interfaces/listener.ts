export interface IOnMessageData {
  text: string
  timestamp: string
  contact: {
    name: string
    phone: string
  }
}

export interface IReplier {
  withText: (text: string) => Promise<void>
}

export interface IWhatsAppListener {
  onMessage: (data: IOnMessageData, reply: IReplier) => Promise<void>
}
