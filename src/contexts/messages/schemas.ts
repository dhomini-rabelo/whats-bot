//* CHAT STRUCTURE

export interface Contact {
  phone: string
  name: string
}

export interface Question {
  key: string
  description: string
  message: string
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
  customStatus: 'started' | 'in progress' | 'finished' | string
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
  startMessage: string | null
  restartMessage: string | null
  withResponse: boolean
}

export interface FinishStep extends Omit<DefaultStep, 'type' | 'options'> {
  type: 'finish-step'
  options: null
}

export interface Bot {
  name: string
  description: string
  steps: Record<string, DefaultStep | StartStep | FinishStep>
  responseForError: string
  // expirationTime: number = 60 * 60 - 1 hour
}

/*

* FLUXO

[client] Cliente envia primeira mensagem
[backend] Recebe a mensagem, cria um Chat lincado com um bot
[backend] Baseado na configuração do bot faz uma pergunta (StartStep | DefaultStep), que pode ser de resposta livre ou baseada em opções
[client] Responde a pergunta, corretamente ou não
[backend] Busca um Chat a partir do contato e do bot
[backend] Processa a resposta, se necessário, irá reenviar
[chat] Conversa continua, expira, finaliza ou reinicia

* RESPOSTA GLOBAIS
sair -> encerra a conversa
reiniciar -> reinicia a conversa


*/
