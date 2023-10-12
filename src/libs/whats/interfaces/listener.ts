export interface IOnMessageData {
  text: string
}

export interface WhatsAppListener {
  onMessage: (data: IOnMessageData) => void
}
