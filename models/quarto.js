import mongoose from 'mongoose'
import {comodidades, Comodidades} from './comodidades.js'
import {alugado, Alugado} from './alugado.js'

const quarto= new mongoose.Schema({
    tamanho_cama: String,
    hospedes: Number,
    comodidades: [String],
    tipo: String,
    alugado: alugado,
    valor: Number,
    image: [String]
});

const Quarto = mongoose.model('Quarto', quarto);

export { quarto, Quarto };
