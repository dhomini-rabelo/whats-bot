import { Bot } from './schemas'

export const bots: Bot[] = [
  {
    name: 'John Doe',
    description: 'Register',
    responseForError: 'Vamos reiniciar o processo de cadastro',
    steps: {
      '1': {
        type: 'start-step',
        startMessage: 'Olá!',
        nextStepId: '2',
      },
      '2': {
        type: 'text-step',
        key: 'name',
        description: 'Nome',
        message: 'Qual seu nome?',
        nextStepId: '3',
      },
      '3': {
        type: 'options-step',
        key: 'isAdult',
        description: 'É adulto?',
        message: 'Você tem mais de 18 anos?',
        nextStepId: '4',
        optionType: 'text',
        options: [
          {
            response: 'SIM',
          },
          {
            response: 'NÃO',
          },
        ],
      },
      '4': {
        type: 'options-step',
        key: 'cellPhoneType',
        description: 'Marca do Celular',
        message: 'Qual a marca do seu celular?',
        optionType: 'numeric',
        options: [
          {
            response: 'Android',
            nextStepId: '5',
          },
          {
            response: 'Iphone',
            nextStepId: '6',
          },
          {
            response: 'Outro',
            nextStepId: '7',
          },
        ],
      },
      '5': {
        type: 'options-step',
        key: 'androidType',
        description: 'Tipo android',
        message: 'Qual o tipo de android do seu celular?',
        optionType: 'numeric',
        nextStepId: '7',
        acceptText: true,
        options: [
          {
            response: 'Samsung',
          },
          {
            response: 'Motorola',
          },
          {
            response: 'Outro',
          },
        ],
      },
      '6': {
        type: 'options-step',
        key: 'iphoneType',
        description: 'Tipo Iphone',
        message: 'Qual o número do seu iphone?',
        optionType: 'numeric',
        nextStepId: '7',
        acceptText: true,
        options: [
          {
            response: '14',
          },
          {
            response: '14 Pro Max',
          },
          {
            response: 'Outro',
          },
        ],
      },
      '7': {
        type: 'finish-step',
        message: 'Obrigado! Envie uma nova mensagem para reiniciar o bate-papo',
      },
    },
  },
]
