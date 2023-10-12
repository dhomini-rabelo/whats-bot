//* CHAT STRUCTURE

export interface Contact {
  phone: string
  name: string
}

export interface Question {
  text: string
  key: string
}

export interface ChatResponse {
  question: Question
  response: string
  timestamp: string
  stepIndex: string
  status: 'success' | 'error'
}

export interface ChatData {
  responses: Array<ChatResponse>
  startedAt: string
  updatedAt: string
  customStatus: string
  status: 'started' | 'in progress' | 'finished'
}

export interface Chat {
  botId: string
  contact: Contact
  stepIndex: string
  currentChat: ChatData
}

export interface ChatHistoric {
  chatId: string
  historic: Array<ChatData>
}

//* BOT STRUCTURE

export interface BaseOption {
  nextStepId: string
}

export interface StringOption extends BaseOption {
  type: 'string'
  response: string
}

export interface NumericOption extends BaseOption {
  type: 'numeric'
  response: string
}

export interface DefaultStep extends Question {
  type: 'default-step'
  options: null | Array<NumericOption | StringOption>
}

export interface StartStep extends Omit<DefaultStep, 'type' | 'message'> {
  type: 'start-step'
  startMessage: string
  restartMessage: string | null
}

export interface FinishStep extends Omit<DefaultStep, 'type' | 'options'> {
  type: 'finish-step'
  options: null
}

export interface Bot {
  name: string
  description: string
  steps: Record<string, DefaultStep | StartStep | FinishStep>
  // expirationTime: number = 60
}
