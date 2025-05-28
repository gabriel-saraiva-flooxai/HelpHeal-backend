const express = require('express')
const router = express.Router()
const controller = require('../controllers/userController')
const authMiddleware = require('../middlewares/auth')

// Rota protegida para admin
router.post('/internal', authMiddleware, controller.createInternalUser)

router.get('/me', authMiddleware, controller.getCurrentUser)

module.exports = router
