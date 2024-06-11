import express from "express"
import EnglishControllerMethods from "./EnglishControllerMethods.js"
import UsuarioController from "./UsuarioController.js"
const router = express.Router()



router.get("/home/:page?", async (req, res) => {
    try {
        let hotels = null
        
        const page = req.params.page ? parseInt(req.params.page) : 0

        if (page >= 0) {
            hotels = await EnglishControllerMethods.findAll(page)
        } else {
            hotels = await EnglishControllerMethods.findAll(0)
        }
        const idUsuario = req.session.user ? parseInt(req.session.user.idUsuario) : null
        if (!idUsuario) return res.render("eng/index", { hotels: hotels })

        const usuario = await UsuarioController.findById(req.session.user.idUsuario)

        if (!usuario) {
            return res.render("eng/index", { hotels: hotels })
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
        
        res.render("eng/index", { hotels: hotelModificado })
    } catch (err) {
        res.status(500).render("eng/errors", {"message": err })
    }
})

router.get("/hotel/apartamento/:idHotel", async(req, res) =>{
    const response = await EnglishControllerMethods.findById(req.params.idHotel)
    res.status(200).render('eng/apartamentoId', {
        hotel: response
    })
})

router.get("/hotel/recentes", async (req, res) => {
    try{
        const response = await EnglishControllerMethods.findRecents()
        res.status(200).render("eng/recentes", {hotels: response, message: 
            "There is no hotels registered in recents history, visit a hotel first."
        })
    }catch(err){
        res.status(500).render("eng/errors", {"message": err })
    }
})

router.get("/hotel/recentes/limpar", async(req, res)=>{
    try{
        EnglishControllerMethods.clearRecents()
        return res.redirect("/eng/hotel/recentes")
    }catch(err){
        res.status(500).render("eng/errors", {"message": err })
    }
})

router.get("/hotel/mapa", async (req, res) => {
    try{
        let { latitude, longitude } = req.query
        if (!latitude || !longitude) {
            latitude = 23.5558
            longitude = 46.6396
        }

        const coordenadas = {
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude)
        }

        const hoteisProximos = await EnglishControllerMethods.findNear(coordenadas)
        res.status(200).render("eng/mapa", {hotels: hoteisProximos})
    }catch(err){
        res.status(500).render("eng/errors", {"message": err })
    }
})

router.get("/hotel/usuario/favoritos", async (req, res) =>{
    try{
        const idUsuario = req.session.user ? parseInt(req.session.user.idUsuario) : null

        if (!idUsuario){
            return res.status(200).render("eng/favoritos", {
                hotels: "", message: 
                "There is no hotels registered in your favorites or you are not logged in."
            })
        } 
        const response =  await EnglishControllerMethods.findByPessoaId(req.session.user.idUsuario)
        res.status(200).render("eng/favoritos", {
            hotels: response, message: 
                "There is no hotels registered in your favorites or you are not logged in."
        })
    }catch(err){
        res.status(500).render("eng/errors", {"message": err })
    }
})

router.post("/hotel/fav/:idHotel", async (req, res) =>{
    try{
        const idUsuario = req.session.user ? parseInt(req.session.user.idUsuario) : null

        if (!idUsuario) return res.redirect("/eng/home")

        const usuario = await UsuarioController.findById(req.session.user.idUsuario)
            

        if (!usuario) {
            return res.redirect("/eng/home")
        }
        const response = await EnglishControllerMethods.saveFav(req.params.idHotel, req.session.user.idUsuario)

        res.status(201).redirect("/eng/home")
    }catch(err){
        res.status(500).render("eng/errors", {"message": err })
    }
})

router.post("/hotel/fav/delete/:idHotel", async (req, res) =>{
    try{
        const idUsuario = req.session.user ? parseInt(req.session.user.idUsuario) : null

        if (!idUsuario) return res.redirect("/eng/home")

        const usuario = await UsuarioController.findById(req.session.user.idUsuario)
            
        if (!usuario) {
            return res.redirect("/eng/home")
        }

        const response = await EnglishControllerMethods.removeFav(req.params.idHotel, req.session.user.idUsuario)
        res.status(204).redirect("/eng/home")
    }catch(err){
        res.status(500).render("eng/errors", {"message": err })
    }
})


router.post("/cadastro/usuario", async(req,res) =>{
    try{
        const response = await UsuarioController.save(req.body.email, req.body.senha)
        req.session.user = {
            idUsuario : response.id,
        } 
        res.status(201).redirect("/eng/home")
    }catch(err){
        res.status(500).send(err.message)
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        if (!email || !senha) {
            return res.status(400).render("eng/errors", { message: "Email and password cannot be empty." })
        }
        const usuario = await UsuarioController.findOne(email)
        if (!usuario) {
            return res.status(500).render("eng/errors",{ message: "User was not found" })
        }
        if (senha != usuario.senha) {
            return res.status(401).render("eng/errors", { message: "Invalid Password" })
        }

        req.session.user = {
            idUsuario : usuario.id,
        } 
        res.status(200).redirect("/eng/home")

    } catch (err) {
        res.status(500).render("eng/errors", {"message": err })
    }
})

router.get("/login/logout", async(req, res) =>{
    req.session.destroy()
    res.redirect("/eng/home")
})
export default router