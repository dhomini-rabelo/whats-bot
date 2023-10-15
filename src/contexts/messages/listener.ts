import {
  IOnMessageData,
  IReplier,
  IWhatsAppListener,
} from '../../application/dependencies/whatsapp-provider/interfaces/listener'
import { bots } from './data'
import {
  Bot,
  Chat,
  FinishStep,
  OptionsStep,
  StartStep,
  ProcessSteps,
  TextStep,
  StepTypes,
  Steps,
} from './schemas'

const chats: Chat[] = []

export class WhatsAppListener implements IWhatsAppListener {
  async onMessage(data: IOnMessageData, reply: IReplier) {
    const bot = bots[0]
    let chat = this.findChat(data)
    if (!chat) {
      const firstStep = bot.steps['1'] as StartStep
      chat = this.createChat(data, firstStep.nextStepId)
      if (firstStep.startMessage) {
        await reply.withText(firstStep.startMessage)
      }
      const nextStep = bot.steps[firstStep.nextStepId] as ProcessSteps
      await this.handleNextStep(nextStep, reply)
    } else {
      const currentStep = bot.steps[chat.stepIndex] as ProcessSteps
      const nextStepId = this.getNextStepId(currentStep, data)
      if (nextStepId) {
        const nextStep = bot.steps[nextStepId] as ProcessSteps | undefined
        if (nextStep) {
          chats[0].stepIndex = nextStepId
          await this.handleNextStep(nextStep, reply)
        }
      }
    }
    console.log({ chats, data })
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
          (option) => option.response === data.text,
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
          `
            ${nextStep.message}
            ${nextStep.options
              .map((option, index) => `${index} - ${option.response}`)
              .join('\n')}
          `.trim(),
        )
      } else if (nextStep.optionType === 'text') {
        await reply.withText(
          `
            ${nextStep.message}
            ${nextStep.options.map((option) => `${option.response}`).join('\n')}
          `.trim(),
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
