export interface IOnMessageData {
  text: string
}

export interface IReplier {
  withText: (text: string) => Promise<void>
}

export interface IWhatsAppListener {
  onMessage: (data: IOnMessageData, reply: IReplier) => Promise<void>
}
