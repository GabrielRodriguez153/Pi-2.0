import mongoose from 'mongoose'
import {avaliacao, Avaliacao} from './avaliacao.js'
import {quarto, Quarto} from './quarto.js'
const hotel = new mongoose.Schema({
    tipo: String,
    nome: String,
    cidade: String,
    endereco: String,
    desc: String,
    localidade: String,
    avaliacao: avaliacao,
    num_avaliacao: Number,
    quarto: [quarto],
    image: String,
    coordenadas: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
})


hotel.index({"coordenadas":"2dsphere"})
const Hotel = mongoose.model('Hotel', hotel)

export { hotel, Hotel };