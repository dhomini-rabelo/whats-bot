import { Message, Whatsapp, create } from 'venom-bot'

create({
  session: 'bot',
  disableWelcome: true,
})
  .then(async (client: Whatsapp) => await start(client))
  .catch((err) => {
    console.log(err)
  })

async function start(client: Whatsapp) {
  client.onMessage(async (message: Message) => {
    if (message.body && !message.isGroupMsg) {
      console.log(`message: ${message.body}`)
      await client.sendText(message.from, 'Olá')
    }
  })
}
