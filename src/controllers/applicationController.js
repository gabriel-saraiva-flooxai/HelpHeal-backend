const Application = require('../models/Application')

module.exports = {
    // Voluntário se candidata
    async apply(req, res) {
        try {
            const { vacancy_id } = req.body
            const volunteer_id = req.user.id

            // Impedir duplicação
            const exists = await Application.findOne({ volunteer_id, vacancy_id })
            if (exists) return res.status(400).json({ error: 'Você já se candidatou' })
        
            const app = await Application.create({ volunteer_id, vacancy_id })
            res.status(201).json(app)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },

    // Voluntário vê próprias candidaturas
    async myApplications(req, res) {
        try {
            const volunteer_id = req.user.id
            const apps = await Application.find({ volunteer_id }).populate('vacancy_id')
            res.json(apps)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },
    
    // Hospital lista candidaturas de uma vaga
    async listByVacancy(req, res) {
        try {
            const { vacancyId } = req.params
            const apps = await Application.find({ vacancy_id: vacancyId }).populate('volunteer_id')
            res.json(apps)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },

    // Aprovar ou rejeitar candidatura
    async updateStatus(req, res) {
        try {
            
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },
    
    // Marcar tarefa como concluída
    async complete(req, res) {
        try {
        const { applicationId } = req.params
        const updated = await Application.findByIdAndUpdate(
            applicationId,
            { status: 'completed', completed_at: new Date() },
            { new: true }
        )
        res.json(updated)
        } catch (error) {
        res.status(400).json({ error: error.message })
        }
    }
}