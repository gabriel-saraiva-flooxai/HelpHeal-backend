const mongoose = require('mongoose')

const HospitalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: String
})

module.exports = mongoose.model('Hospital', HospitalSchema)