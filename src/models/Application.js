const mongoose = require('mongoose')

const ApplicationSchema = new mongoose.Schema({
  volunteer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vacancy_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vacancy', required: true },
  status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
  started_at: { type: Date },
  completed_at: { type: Date }
}, { timestamps: true })

module.exports = mongoose.model('Application', ApplicationSchema)