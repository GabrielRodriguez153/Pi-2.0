import express from "express"
import HotelController from "./HotelController.js"
import UsuarioController from "./UsuarioController.js"
import { hotel } from "../models/hotel.js";
const router = express.Router()
router.get("/home/:idUsuario", async (req, res) => {
    try {

        const testeAvaliacao = {
            "wifi": true
        }
        
        let tipo = "Luxury"
        let localidade = "deserto"
        let cidade = "Registro"
        const entrada = "2024-05-01"
        const saida = "2024-05-01"
        const hotels = await HotelController.findAll()
        const hotelFiltrado = await HotelController.findByQuartoPreco(100, 1000)
        const hotelAvaliado = await HotelController.findByAvaliacao(0, testeAvaliacao)
        const hotelTipado = await HotelController.findByTipo(tipo)
        const hotelLocalidade = await HotelController.findByLocalidade(localidade)
        const hotelCidade = await HotelController.findByCidade(cidade)
        const hotelVago = await HotelController.findHotelVago(entrada, saida)
        // console.log("Usuário")
        // const usuario = await UsuarioController.findById(req.params.idUsuario)
        // if(!usuario) return
        
        // console.log("Favoritos")
        // const favoritos = usuario.favorito

        // console.log("Atualizando array de hotels")
        // const updatedHotels = hotels.map((hotel) => {
        //     const isFavorite = favoritos.some((favorito) => favorito.hotel.id === hotel.id)
        //     return { ...hotel, classe: isFavorite ? "fav" : "" }
        // })
        // console.log("Devolvendo hotels")

        // const response = []
        // response.push(updatedHotels)
        res.send(hotelVago)

    } catch (error) {
        console.error("Error fetching data:", error)
        res.status(500).json({ error: "Internal server error" })
    }
})

router.get("/home", async (req, res) => {
    try {
        const hotels = await HotelController.findAll()

        // console.log("Usuário")
        // const usuario = await UsuarioController.findById(req.params.idUsuario)
        // if(!usuario) return
        
        // console.log("Favoritos")
        // const favoritos = usuario.favorito

        // console.log("Atualizando array de hotels")
        // const updatedHotels = hotels.map((hotel) => {
        //     const isFavorite = favoritos.some((favorito) => favorito.hotel.id === hotel.id)
        //     return { ...hotel, classe: isFavorite ? "fav" : "" }
        // })
        // console.log("Devolvendo hotels")

        // const response = []
        // response.push(updatedHotels)
        res.send(hotels)

    } catch (error) {
        console.error("Error fetching data:", error)
        res.status(500).json({ error: "Internal server error" })
    }
})


export default router