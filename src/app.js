require('dotenv').config()
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

const authRoutes = require('./routes/auth')
app.use('/api/auth', authRoutes)

const vacancyRoutes = require('./routes/vacancy')
app.use('/api/vacancies', vacancyRoutes)

const applicationRoutes = require('./routes/application')
app.use('/api/applications', applicationRoutes)

const userRoutes = require('./routes/user')
app.use('/api/users', userRoutes)

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Backend is running on port ${port}`)
})

module.exports = app