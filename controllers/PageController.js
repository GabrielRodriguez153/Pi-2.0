import express from "express"
import HotelController from "./HotelController.js"
import UsuarioController from "./UsuarioController.js"
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
        res.status(500).render("errors", {"message": err })
    }
})

router.get("/hotel/apartamento/:idHotel", async(req, res) =>{
    const response = await HotelController.findById(req.params.idHotel)
    res.status(200).render('apartamentoId', {
        hotel: response
    })
})

router.get("/hotel/usuario/recents", async (req, res) => {
    try{
        const response = await HotelController.findRecents()
        res.status(200).send(response)
    }catch(err){
        res.status(500).render("errors", {"message": err })
    }
})


router.get("/hotel/points/map", async (req, res) => {
    try{
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
        res.status(500).render("errors", {"message": err })
    }
})

router.get("/hotel/fav/:idPessoa", async (req, res) =>{
    try{
        const response =  await HotelController.findByPessoaId(req.params.idPessoa)
        res.status(200).send(response)
    }catch(err){
        res.status(500).render("errors", {"message": err })
    }
})

router.post("/hotel/fav/:idHotel", async (req, res) =>{
    try{
        const idUsuario = req.session.user ? parseInt(req.session.user.idUsuario) : null

        if (!idUsuario) return res.redirect("/")

        const usuario = await UsuarioController.findById(req.session.user.idUsuario)
            

        if (!usuario) {
            return res.redirect("/")
        }
        const response = await HotelController.saveFav(req.params.idHotel, req.session.user.idUsuario)

        res.status(201).redirect("/")
    }catch(err){
        res.status(500).render("errors", {"message": err })
    }
})

router.post("/hotel/fav/delete/:idHotel", async (req, res) =>{
    try{
        const idUsuario = req.session.user ? parseInt(req.session.user.idUsuario) : null

        if (!idUsuario) return res.redirect("/")

        const usuario = await UsuarioController.findById(req.session.user.idUsuario)
            
        if (!usuario) {
            return res.redirect("/")
        }

        const response = await HotelController.removeFav(req.params.idHotel, req.session.user.idUsuario)
        res.status(204).redirect("/")
    }catch(err){
        res.status(500).render("errors", {"message": err })
    }
})

router.post("/cadastro/usuario", async(req,res) =>{
    try{
        const response = await UsuarioController.save(req.body.email, req.body.senha)
        res.status(201).send(response)
    }catch(err){
        res.status(500).send(err.message)
    }
})

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        res.status(400).render("errors", { message: "Email e senha são obrigatórios!" })
    }

    try {
        const usuario = await UsuarioController.findOne(email)
        if (!usuario) {
            res.status(500).render("errors",{ message: "Usuário não encontrado!" })
        }
        if (senha != usuario.senha) {
            res.status(401).render("errors", { message: "Senha inválida!" })
        }

        req.session.user = {
            idUsuario : usuario.id,
        } 
        res.status(200).redirect("/")

    } catch (error) {
        res.status(500).render("errors", {"message": err })
    }
})

export default router