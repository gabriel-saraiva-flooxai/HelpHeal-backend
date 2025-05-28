const auth = require('../config/auth')

module.exports = (req, res, next) => {
  let token = req.headers['authorization']
  if (!token) return res.status(401).send('Token não fornecido')

  // se vier "Bearer <token>", corta o "Bearer "
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length).trim()
  }

  try {
    const decoded = auth.verifyToken(token)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).send('Token inválido')
  }
}
