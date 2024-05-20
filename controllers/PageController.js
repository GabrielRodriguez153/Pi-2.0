import express from "express"
import HotelController from "./HotelController.js"
import UsuarioController from "./UsuarioController.js"
import { hotel } from "../models/hotel.js";
const router = express.Router()
router.get("/home/:idUsuario", async (req, res) => {
    try {
        console.log("Hotels")
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
});


export default router