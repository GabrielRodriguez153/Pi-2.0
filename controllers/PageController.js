import express from "express"
import HotelController from "./HotelController.js"
import UsuarioController from "./UsuarioController.js"
import UsuarioRepository from "../repository/UsuarioRepository.js"
const router = express.Router()



router.get("/:page?", async (req, res) => {
    try {
        let hotels = null
        
        const page = req.params.page ? parseInt(req.params.page) : 0

        if (page >= 0) {
            hotels = await HotelController.findAll(page)
        } else {
            hotels = await HotelController.findAll(0)
        }

        const idUsuario = req.session.user ? parseInt(req.session.user.idUsuario) : null
        if (!idUsuario) return res.render("index", { hotels: hotels })

        const usuario = await UsuarioController.findById(req.session.user.idUsuario)

        if (!usuario) {
            return res.render("index", { hotels: hotels })
        }
        console.log("Achei Usuário")
        const favoritos = usuario.favorito || []

        const hotelModificado = hotels.map(hotel => {
            const hotelData = hotel._doc || hotel
        
            const normalizedHotel = {
                id: hotelData._id,
                tipo: hotelData.tipo,
                nome: hotelData.nome,
                cidade: hotelData.cidade,
                endereco: hotelData.endereco,
                desc: hotelData.desc,
                localidade: hotelData.localidade,
                avaliacao: hotelData.avaliacao,
                num_avaliacao: hotelData.num_avaliacao,
                quarto: hotelData.quarto,
                image: hotelData.image,
                coordenadas: hotelData.coordenadas,
                classe: favoritos.some(favorito => favorito._id.equals(hotel._id)) ? "class-favorito" : ""
            }
        
            return normalizedHotel
        })
        
        res.render("index", { hotels: hotelModificado })
    } catch (error) {
        console.error("Erro, não foi possível buscar os hotéis:", error)
        res.status(500).send("Erro")
    }
})

router.get("/hotel/:idHotel", async(req, res) =>{
    const response = await HotelController.findById(req.params.idHotel)
    res.status(200).send(response)
})

router.get("/hotel/usuario/recents", async (req, res) => {
    try{
        const response = await HotelController.findRecents()
        res.status(200).send(response)
    }catch(err){

    }
})


router.get("/hotel/points/map", async (req, res) => {
    try{
        console.log("AQUI")
        const { latitude, longitude } = req.query
        if (!latitude || !longitude) {
            res.status(400).send({ erro: 'Faltou a latitude ou longitude' })
        }

        const coordenadas = {
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude)
        }

        const hoteisProximos = await HotelController.findNear(coordenadas)
        res.status(200).send(hoteisProximos)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

router.get("/hotel/fav/:idPessoa", async (req, res) =>{
    try{
        const response =  await HotelController.findByPessoaId(req.params.idPessoa)
        res.status(200).send(response)
    }catch(err){
        res.status(500).send()
    }
})

router.post("/hotel/fav/:idHotel", async (req, res) =>{
    try{
        const idUsuario = req.session.user ? parseInt(req.session.user.idUsuario) : null

        if (!idUsuario) return res.redirect("/")

        console.log("Procurando usuário", )
        const usuario = await UsuarioController.findById(req.session.user.idUsuario)
            

        if (!usuario) {
            return res.redirect("/")
        }
        console.log(usuario)
        const response = await HotelController.saveFav(req.params.idHotel, req.session.user.idUsuario)

        res.status(201).redirect("/")
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

router.post("/hotel/fav/delete/:idHotel", async (req, res) =>{
    try{
        console.log("Aqui")
        const idUsuario = req.session.user ? parseInt(req.session.user.idUsuario) : null
        console.log(idUsuario)

        if (!idUsuario) return res.redirect("/")

        console.log("Procurando usuário", )

        const usuario = await UsuarioController.findById(req.session.user.idUsuario)
            

        if (!usuario) {
            return res.redirect("/")
        }

        const response = await HotelController.removeFav(req.params.idHotel, req.session.user.idUsuario)
        res.status(204).redirect("/")
    }catch(err){
        res.status(500).send(err)
    }
})

router.post("/usuario", async(req,res) =>{
    try{
        const response = await UsuarioController.save(req.body.email, req.body.senha, req.body.telefone)
        res.status(201).send(response)
    }catch(err){
        res.status(500).send(err.message)
    }
})

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        res.status(400).send({ message: "Email e senha são obrigatórios!" })
    }

    try {
        const usuario = await UsuarioController.findOne(email)
        if (!usuario) {
            res.status(500).send({ message: "Usuário não encontrado!" })
        }
        if (senha != usuario.senha) {
            res.status(401).send({ message: "Senha inválida!" })
        }

        req.session.user = {
            idUsuario : usuario.id,
        } 
        res.status(200).redirect("/")

    } catch (error) {
        console.log(error)
        res.status(500).redirect("/")
    }
})


export default router