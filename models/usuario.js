import {hotel, Hotel} from './hotel.js'
import mongoose from 'mongoose'

const usuario = new mongoose.Schema({
    email : String,
    senha : String,
    telefone : Number,
    favorito:[hotel]
})

const Usuario = mongoose.model("Usuario", usuario);


export  {usuario, Usuario}