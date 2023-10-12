import express from 'express'
import { env } from './env'
import { whatsAppProvider } from './dependencies'

const app = express()

whatsAppProvider.start()

app.use(express.json())

app.get('/', function (req, res) {
  return res.status(200).json({
    Hello: 'World',
  })
})

app.listen(env.PORT, () => {
  console.log('Server running')
})
