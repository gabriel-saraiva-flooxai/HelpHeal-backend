const Application = require('../models/Application')

module.exports = {
    // Voluntário se candidata
    async apply(req, res) {
        try {
            const vacancy   = req.body.vacancyId
            const volunteer = req.user.id

            // Impedir duplicação
            const exists = await Application.findOne({ volunteer, vacancy })
            if (exists) return res.status(400).json({ error: 'Você já se candidatou' })
        
            const app = await Application.create({ volunteer, vacancy })
            res.status(201).json(app)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },

    // Voluntário vê próprias candidaturas
    async myApplications(req, res) {
        try {
            const volunteer = req.user.id
            const apps = await Application.find({ volunteer }).populate('vacancy')
            res.json(apps)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },
    
    // Hospital lista candidaturas de uma vaga
    async listByVacancy(req, res) {
        try {
            const { vacancyId } = req.params
            const apps = await Application.find({ vacancy: vacancyId }).populate('volunteer')
            res.json(apps)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },

    // Aprovar ou rejeitar candidatura
    async updateStatus(req, res) {
        try {
            const { applicationId } = req.params
            const { status } = req.body

            if (!['approved', 'rejected'].includes(status)) {
                return res.status(400).json({ error: 'Status inválido' })
            }

            const updated = await Application.findByIdAndUpdate(
                applicationId,
                { status },
                { new: true }
            )

            res.json(updated)
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