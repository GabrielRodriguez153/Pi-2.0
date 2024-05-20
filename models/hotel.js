import mongoose from 'mongoose'
import {avaliacao, Avaliacao} from './avaliacao.js'
import {quarto, Quarto} from './quarto.js'
import {image, Image} from './image.js'
const hotel = new mongoose.Schema({
    nome: String,
    endereco: String,
    desc: String,
    avaliacao: avaliacao,
    num_avaliacao: Number,
    quarto: [quarto],
    image: [image] 
});

const Hotel = mongoose.model('Hotel', hotel);

export { hotel, Hotel };