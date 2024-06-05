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
        console.log("Achei Id", req.session.user.idUsuario)

        const usuario = await UsuarioController.findById(req.session.user.idUsuario)

        if (!usuario) {
            return res.render("index", { hotels: hotels })
        }
        console.log("Achei Usuário")
        const favoritos = usuario.favorito || [];

        const hotelModificado = hotels.map(hotel => {
            if (favoritos.some(favorito => favorito._id.equals(hotel._id))) {
                return { ...hotel, classe: "class-favorito" }
            } else {
                return hotel
            }
        })
        console.log("ACHEI favoritos")

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
            res.status(400).send({ erro: 'Faltou a latitude ou longitude' });
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

        const usuario = await UsuarioController.findById(idUsuario)

        if (!usuario) {
            return res.redirect("/")
        }

        const response = await HotelController.saveFav(req.params.idHotel, req.params.idPessoa)

        res.status(201).redirect("/")
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

router.delete("/hotel/fav/:idHotel", async (req, res) =>{
    try{
        const idUsuario = req.session.user ? parseInt(req.session.user.idUsuario) : null

        if (!idUsuario) return res.redirect("/")

        const usuario = await UsuarioController.findById(idUsuario)

        if (!usuario) {
            return res.redirect("/")
        }

        const response = await HotelController.removeFav(req.params.idHotel, req.params.idPessoa)
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
        res.status(400).send({ message: "Email e senha são obrigatórios!" });
    }

    try {
        const usuario = await UsuarioController.findOne(email);
        if (!usuario) {
            res.status(500).send({ message: "Usuário não encontrado!" });
        }
        console.log(senha)
        console.log(usuario.senha)
        if (senha != usuario.senha) {
            res.status(401).send({ message: "Senha inválida!" });
        }

        req.session.user = {
            idUsuario : usuario.id,
        } 
        res.status(200).redirect("/")

    } catch (error) {
        console.log(error)
        res.status(500).redirect("/");
    }
});


export default router