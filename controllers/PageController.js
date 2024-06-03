import express from "express"
import HotelController from "./HotelController.js"
import UsuarioController from "./UsuarioController.js"

const router = express.Router()
router.get("/home/:page?/usuario/:idUsuario", async (req, res) => {
    try {
        let hotels = null
        const page = req.params.page ? parseInt(req.params.page) : 0

        if (page) {
            hotels = await HotelController.findAll(page)
        } else {
            hotels = await HotelController.findAll(0)
        }
        
        const usuario = await UsuarioController.findById(req.params.idUsuario)
        if (!usuario) {
            return res.send(hotels)
        }
        
        const favoritos = usuario.favorito
        if (!favoritos) {
            return res.send(hotels)
        }
        let hotelModificado = []
        hotels.forEach(hotel => {
            favoritos.forEach(favorito => {
                if (favorito._id.equals(hotel._id)) {
                    hotel = { ...hotel, classe: "class-favorito" }
                    hotelModificado.push(hotel)
                }
                else{
                    hotelModificado.push(hotel)
                }
            })
        })
        res.send(hotelModificado)
        
    } catch (error) {
        console.error("Erro, não foi possível buscar os hotéis:", error)
        res.status(500).send("Internal Server Error")
    }
})



router.get("/home/:page?", async (req, res) => {
    try {
        let hotels = null
        const page = req.params.page ? parseInt(req.params.page) : 0

        if (page) {
            hotels = await HotelController.findAll(page)
        } else {
            hotels = await HotelController.findAll(0)
        }

        res.send(hotels);
    } catch (error) {
        console.error("Erro, não foi possível buscar os hotéis:", error)
        res.status(500).json({ error: "Erro interno" })
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

router.post("/hotel/fav/:idHotel/usuario/:idPessoa", async (req, res) =>{
    try{
        const response = await HotelController.saveFav(req.params.idHotel, req.params.idPessoa)
        res.status(201).send(response)
    }catch(err){
        res.status(500).send(err)
    }
})

router.delete("/hotel/fav/:idHotel/usuario/:idPessoa", async (req, res) =>{
    try{
        const response = await HotelController.removeFav(req.params.idHotel, req.params.idPessoa)
        res.status(201).send(response)
    }catch(err){
        res.status(500).send(err)
    }
})

router.post("/usuario", async(req,res) =>{
    try{
        console.log("teste")

        const response = await UsuarioController.save(req.body.email, req.body.senha, req.body.telefone)
        res.status(201).send(response)
    }catch(err){
        res.status(500).send()
    }
})
export default router