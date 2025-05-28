const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = {
    // Novo endpoint para pegar usuário atual
    async getCurrentUser(req, res) {
        try {
            const user = await User.findById(req.user._id)
                .select('-password') // Remove o campo da senha
                .populate('hospital_id', 'name') // Popula dados do hospital se necessário

            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' })
            }

            res.json(user)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },

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
            res.status(201).json({ message: 'Usuário interno criado', userId: user._id })
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}