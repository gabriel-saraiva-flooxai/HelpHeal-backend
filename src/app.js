const port = 3003

const express = require('express')
const bodyParser = require('body-parser')
const allowCors = require('./middlewares/cors')

const app = express()

// Middlewares
app.use(allowCors)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Rota de teste
app.get('/', (req, res) => {
  res.send('API HelpHeal está funcionando!')
})

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Backend is running on port ${port}`)
})

module.exports = app