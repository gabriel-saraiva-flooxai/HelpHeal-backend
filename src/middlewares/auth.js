const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization
  
  if (!authHeader) {
    return res.status(401).send('Token não fornecido')
  }

  const parts = authHeader.split(' ')
  
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).send('Token mal formatado')
  }

  const token = parts[1]

  try {
    const decoded = jwt.verify(token, process.env.AUTH_SECRET)
    req.userId = decoded._id
    req.userRole = decoded.role
    return next()
  } catch (err) {
    return res.status(401).send('Token inválido')
  }
}