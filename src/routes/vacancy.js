const express = require('express')
const router = express.Router()
const vacancyController = require('../controllers/vacancyController')
const authMiddleware = require('../middlewares/auth')

// Público: listagem de vagas
router.get('/', vacancyController.list)

// Protegido: criar nova vaga
router.post('/', authMiddleware, vacancyController.create)

router.get('/hospital', authMiddleware, vacancyController.listByHospital)

module.exports = router
