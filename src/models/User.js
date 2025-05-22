const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  hospital_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'internal_user', 'volunteer'], default: 'volunteer' }
})

module.exports = mongoose.model('User', UserSchema)