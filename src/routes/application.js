const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth')
const controller = require('../controllers/applicationController')

// Voluntário se candidata
router.post('/', authMiddleware, controller.apply)

// Voluntário vê suas candidaturas
router.get('/my', authMiddleware, controller.myApplications)

// Hospital vê candidaturas por vaga
router.get('/vacancy/:vacancyId', authMiddleware, controller.listByVacancy)

// Hospital aprova/rejeita candidatura
router.patch('/:applicationId/status', authMiddleware, controller.updateStatus)

// Hospital marca como concluída
router.patch('/:applicationId/complete', authMiddleware, controller.complete)

module.exports = router
