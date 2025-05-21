const PORTA = 3003

const bodyParser = require('body-parser')
const express = require('express')
const server = express()

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

server.listen(PORTA, function() {
  console.log(`BACKEND rodando na porta ${PORTA}`)
})