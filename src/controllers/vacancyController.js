const Vacancy = require('../models/Vacancy')
const User = require('../models/User')

module.exports = {
  async create(req, res) {
    try {
      // Verifica se o usuário é admin ou funcionário interno
      const user = await User.findById(req.user.id)
      if (!['admin', 'internal_user'].includes(user.role)) {
        return res.status(403).json({
          error: 'Apenas administradores e funcionários podem criar vagas'
        })
      }

      const { title, description, type, points } = req.body

      const vacancy = await Vacancy.create({
        title,
        description,
        type,
        points,
        created_by: req.user.id,
        hospital: user.hospital_id // Associa ao hospital do usuário
      })
      res.status(201).json(vacancy)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  },

  async listByHospital(req, res) {
    const vacancies = await Vacancy.find({
      hospital: req.user.hospital_id
    })
    res.json(vacancies)
  },

  async list(req, res) {
    try {
      const vacancies = await Vacancy.find({ status: 'open' })
      res.json(vacancies)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}
