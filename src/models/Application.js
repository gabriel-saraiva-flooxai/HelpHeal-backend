const mongoose = require('mongoose')

const ApplicationSchema = new mongoose.Schema({
  volunteer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vacancy: { type: mongoose.Schema.Types.ObjectId, ref: 'Vacancy', required: true },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected', 'in_progress', 'completed'], 
    default: 'pending' 
  },
  started_at: { type: Date },
  completed_at: { type: Date },
  hospitalFeedback: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('Application', ApplicationSchema)
