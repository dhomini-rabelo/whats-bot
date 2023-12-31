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

export interface Option {
  nextStepId?: string
  response: string
}

export type StepTypes =
  | 'text-step'
  | 'options-step'
  | 'start-step'
  | 'finish-step'

export interface TextStep extends Question {
  type: 'text-step'
  nextStepId: string
}

export interface OptionsStep extends Question {
  type: 'options-step'
  options: Array<Option>
  optionType: 'numeric' | 'text'
  nextStepId?: string
  acceptText?: boolean
}

export interface StartStep {
  type: 'start-step'
  startMessage?: string
  restartMessage?: string
  nextStepId: string
}

export interface FinishStep {
  type: 'finish-step'
  message: string
}

export type ProcessSteps = TextStep | OptionsStep | FinishStep

export type Steps = ProcessSteps | StartStep
export interface Bot {
  name: string
  description: string
  steps: Record<string, Steps>
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
[chat] Conversa continua, expira, finaliza[com sucesso ou não] ou reinicia

* RESPOSTA GLOBAIS
sair -> encerra a conversa
reiniciar -> reinicia a conversa


*/
