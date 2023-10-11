import express from 'express'
import { env } from './env'
import './whats'

const app = express()

app.use(express.json())

app.get('/', function (req, res) {
  return res.status(200).json({
    Hello: 'World',
  })
})

app.listen(env.PORT, () => {
  console.log('Server running')
})
