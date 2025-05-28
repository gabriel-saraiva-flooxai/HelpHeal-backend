require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = {
  secret: process.env.AUTH_SECRET || 'sua_chave_secreta_jwt',
  generateToken(payload) {
    return jwt.sign(payload, this.secret, { expiresIn: '24h' })
  },
  verifyToken(token) {
    return jwt.verify(token, this.secret)
  }
}


// Imprima no console do navegador no seu useAuth o valor de localStorage.getItem('token') dentro do useEffect inicial. O token está lá? Qual é o seu valor? Se o token existe, verifique a requisição /api/users/me novamente. O cabeçalho Authorization está presente? O token enviado é o mesmo que está no localStorage?