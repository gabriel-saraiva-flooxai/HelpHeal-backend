require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../models/User')
const Hospital = require('../models/Hospital')
const bcrypt = require('bcrypt')

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/helpheal')

    // 1. Criar Hospital de Teste
    const hospital = await Hospital.create({
      name: "Hospital Geral de Testes",
      address: "Rua Exemplo, 123"
    })

    // 2. Criar Admin
    const adminPassword = await bcrypt.hash('admin123', 10)
    await User.create({
      name: "Admin Teste",
      email: "admin@teste.com",
      password: adminPassword,
      role: "admin",
      hospital_id: hospital._id
    })

    // 3. Criar Funcionário
    const staffPassword = await bcrypt.hash('func123', 10)
    await User.create({
      name: "Funcionário Teste",
      email: "funcionario@teste.com",
      password: staffPassword,
      role: "internal_user",
      hospital_id: hospital._id
    })

    console.log('✅ Dados de teste criados:')
    console.log('- Hospital:', hospital.name)
    console.log('- Admin: admin@teste.com | Senha: admin123')
    console.log('- Funcionário: funcionario@teste.com | Senha: func123')

  } catch (error) {
    console.error('Erro ao popular dados:', error)
  } finally {
    mongoose.disconnect()
  }
}

seedDatabase()