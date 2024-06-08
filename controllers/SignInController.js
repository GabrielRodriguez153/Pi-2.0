import express from 'express'
const router = express.Router()
import UsuarioRepository from '../repository/UsuarioRepository.js'

router.get('/cadastro',(req,res) =>{
    res.render('cadastro')
})

router.post('/cadastro', async (req, res) => {
    try {
        const { nome, email, senha } = req.body

        if (!nome || !email || !senha) {
            res.status(400).send("Os são campos obrigatórios")
        }

        const usuarioExiste = await UsuarioRepository.findByEmail(email)
        if (usuarioExiste) {
            res.status(400).send("Este email já está cadastrado.")
        }
        const novoUsuario = {
            nome : nome,
            email : email,
            senha : senha
        }
        await UsuarioRepository.create(novoUsuario);

        res.redirect('/cadastro');
    } catch (error) {
        res.status(500).send("Ocorreu um erro ao processar sua solicitação.")
    }
})


export default router