import express from 'express'

const app = express()

app.use(express.json())

app.get('/', function (req, res) {
  return res.status(200).json({
    Hello: 'World',
  })
})

app.listen(5001, () => {
  console.log('Server running')
})
