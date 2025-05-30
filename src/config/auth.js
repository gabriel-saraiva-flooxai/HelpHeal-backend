const User = require('../models/User')

require('dotenv').config()
const jwt = require('jsonwebtoken')


module.exports = {
  secret: process.env.JWT_SECRET || 'cHaVe_JwT_sEcReTa',
  generateToken(payload) {
    return jwt.sign(payload, this.secret, { expiresIn: '24h' })
  },
  verifyToken(token) {
    return jwt.verify(token, this.secret)
  }
}