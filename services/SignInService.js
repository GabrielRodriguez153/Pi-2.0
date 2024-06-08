import { Usuario } from "../models/usuario.js"
import mongoose from "mongoose"
import SignInRepository from "../repository/UsuarioRepository.js"

class SignInService{
    async findById(id){
        return await SignInRepository.findById(id)
    }

    async create(email,senha,telefone){
        return await SignInRepository.create(email,senha,telefone)
    }


}

export default new SignInService()