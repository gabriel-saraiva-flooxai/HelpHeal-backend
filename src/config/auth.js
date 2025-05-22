require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = {
  secret: process.env.JWT_SECRET || 'segredo-desenvolvimento',
  generateToken(payload) {
    return jwt.sign(payload, this.secret, { expiresIn: '24h' })
  },
  verifyToken(token) {
    return jwt.verify(token, this.secret)
  }
}