const mongoose = require('mongoose')

const VacancySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['jovem', 'idoso', 'familia'], required: true },
  points: { type: Number, required: true },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['open', 'closed'], default: 'open' }
}, { timestamps: true })

module.exports = mongoose.model('Vacancy', VacancySchema)