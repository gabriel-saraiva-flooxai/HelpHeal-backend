const auth = require('../config/auth')

module.exports = (req, res, next) => {
  const token = req.headers['authorization']
  
  if (!token) return res.status(401).send('Token não fornecido')
  
  try {
    const decoded = auth.verifyToken(token)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).send('Token inválido')
  }
}