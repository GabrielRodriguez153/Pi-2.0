import moongose from 'mongoose'
import {hotel, Hotel} from '../models/hotel.js'

const favorito = new moongose.Schema({
    hotel:hotel
})
const Favorito = new moongose.model("favorito", favorito)

export default {favorito, Favorito}