import {
  IOnMessageData,
  IReplier,
  IWhatsAppListener,
} from '../../application/dependencies/whatsapp-provider/interfaces/listener'
import { bots } from './data'
import { Chat, StartStep, ProcessSteps, Steps } from './schemas'

const chats: Chat[] = []

export class WhatsAppListener implements IWhatsAppListener {
  async onMessage(data: IOnMessageData, reply: IReplier) {
    const bot = bots[0]
    const chat = this.findChat(data) || this.createChat(data, '1')
    if (
      chat.stepIndex === '1' &&
      ['started', 'finished'].includes(chat.currentChat.status)
    ) {
      const firstStep = bot.steps['1'] as StartStep
      if (firstStep.startMessage) {
        await reply.withText(firstStep.startMessage)
      }
      const nextStep = bot.steps[firstStep.nextStepId] as ProcessSteps
      await this.handleNextStep(nextStep, reply)
      chats[0].currentChat.status = 'in progress'
      chats[0].stepIndex = '2'
    } else {
      const currentStep = bot.steps[chat.stepIndex] as ProcessSteps
      if (this.responseIsValid(currentStep, data)) {
        // continue
        const nextStepId = this.getNextStepId(currentStep, data)
        if (nextStepId) {
          const nextStep = bot.steps[nextStepId] as ProcessSteps | undefined
          if (nextStep) {
            chats[0].stepIndex = nextStepId
            await this.handleNextStep(nextStep, reply)
            if (nextStep.type === 'finish-step') {
              chats[0].stepIndex = '1'
              chats[0].currentChat.status = 'finished'
            } else {
              chats[0].currentChat.status = 'in progress'
            }
          }
        }
      } else {
        await reply.withText('Resposta não identificada!')
        await this.handleNextStep(currentStep, reply)
      }
    }
    console.log({ chats, data })
  }

  private responseIsValid(step: ProcessSteps, data: IOnMessageData): boolean {
    if (step.type === 'options-step') {
      if (step.optionType === 'numeric') {
        return step.options[data.text] !== undefined
      }
      if (step.optionType === 'text') {
        const option = step.options.find(
          (option) => option.response.toLowerCase() === data.text.toLowerCase(),
        )
        return option !== undefined
      }
    }
    return true
  }

  private getNextStepId(
    currentStep: ProcessSteps,
    data: IOnMessageData,
  ): string | undefined {
    if (currentStep.type === 'text-step') {
      return currentStep.nextStepId
    } else if (currentStep.type === 'options-step') {
      if (currentStep.nextStepId) {
        return currentStep.nextStepId
      } else if (currentStep.optionType === 'numeric') {
        const option = currentStep.options[data.text]
        if (option && option.nextStepId) {
          return option.nextStepId
        }
      } else if (currentStep.optionType === 'text') {
        const option = currentStep.options.find(
          (option) => option.response.toLowerCase() === data.text.toLowerCase(),
        )
        if (option && option.nextStepId) {
          return option.nextStepId
        }
      }
    }
  }

  private async handleNextStep(nextStep: ProcessSteps, reply: IReplier) {
    if (nextStep.type === 'text-step') {
      await reply.withText(nextStep.message)
    } else if (nextStep.type === 'options-step') {
      if (nextStep.optionType === 'numeric') {
        await reply.withText(
          [
            nextStep.message,
            '',
            ...nextStep.options.map(
              (option, index) => `${index} - ${option.response}`,
            ),
          ].join('\n'),
        )
      } else if (nextStep.optionType === 'text') {
        await reply.withText(
          [
            nextStep.message,
            '',
            ...nextStep.options.map((option) => `- ${option.response}`),
          ].join('\n'),
        )
      }
    } else if (nextStep.type === 'finish-step') {
      await reply.withText(nextStep.message)
    }
  }

  private findChat(data: IOnMessageData): Chat | undefined {
    return chats.find((chat) => chat.contact.phone === data.contact.phone)
  }

  private createChat(data: IOnMessageData, nextStepId: string): Chat {
    const chat: Chat = {
      botId: '1',
      contact: {
        name: data.contact.name,
        phone: data.contact.phone,
      },
      stepIndex: nextStepId,
      currentChat: {
        responses: [],
        customStatus: 'stated',
        status: 'started',
        startedAt: '1',
        updatedAt: '2',
      },
    }
    chats.push(chat)
    return chat
  }
}
