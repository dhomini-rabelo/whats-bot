export interface IOnMessageData {
  text: string
}

export interface IWhatsAppListener {
  onMessage: (data: IOnMessageData) => void
}
