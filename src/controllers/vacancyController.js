const Vacancy = require('../models/Vacancy')

module.exports = {
  async create(req, res) {
    try {
      const { title, description, type, points } = req.body
      const created_by = req.user.id  // ID do usuário autenticado

      const vacancy = await Vacancy.create({ title, description, type, points, created_by })
      res.status(201).json(vacancy)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
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
