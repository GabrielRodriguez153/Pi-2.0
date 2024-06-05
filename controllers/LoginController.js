import express from 'express'
const router = express.Router()
import UsuarioRepository from "../repository/UsuarioRepository.js"

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        res.status(400).send({ message: "Email e senha são obrigatórios!" });
    }

    try {
        const usuario = await UsuarioRepository.findByEmail(email);
        if (!usuario) {
            res.status(404).send({ message: "Usuário não encontrado!" });
        }

        const isPasswordValid = await bcrypt.compare(senha, usuario.senha);
        if (!isPasswordValid) {
            res.status(401).send({ message: "Senha inválida!" });
        }

        req.session.userId = usuario._id;
        req.session.userEmail = usuario.email;

    } catch (error) {
        res.status(500, ({ message: "Erro ao realizar login!", error: error.message }));
    }
});

export default router