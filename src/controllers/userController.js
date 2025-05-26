const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = {
    async createInternalUser(req, res) {
        try {
            if (req.user.role !== 'admin') {
                return res.status(403).send('Apenas admins podem criar usuários internos')
            }

            const { name, email, password, role } = req.body

            // Valida o tipo de usuário
            if (!['internal_user'].includes(role)) {
                return res.status(400).send('Tipo de usuário inválido')
            }

            const existingUser = await User.findOne({ email })
            if (existingUser) {
                return res.status(400).send('Já existe um usuário com este e-mail')
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            const user = new User({
                name,
                email,
                password: hashedPassword,
                role,
                hospital_id: req.user.hospital_id // vincula ao mesmo hospital do admin
            })

            await user.save()
            res.status(201).send('Usuário interno criado com sucesso')
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}