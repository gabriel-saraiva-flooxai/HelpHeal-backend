const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const auth = require('../config/auth')

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'volunteer'
    })
    
    await user.save()
    res.status(201).send('Usuário criado com sucesso')
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Credenciais inválidas')
    }
    
    const token = auth.generateToken({ id: user._id, role: user.role })
    res.json({ token })
  } catch (error) {
    res.status(400).send(error.message)
  }
})

module.exports = router