import { Usuario } from "../models/usuario.js"
import UsuarioRepository from "../repository/UsuarioRepository.js"

class LoginService{
    async findAll(){
        return await UsuarioRepository.findAll()
    }

    async create(email,senha,telefone){
        return await UsuarioRepository.create(email,senha,telefone)
    }

    async update(id,email,senha,telefone){
        return await UsuarioRepository.update(id,email,senha,telefone)
    }

    async delete(id){
        return await UsuarioRepository.delete(id)
    }

    async findOne(email){
        return await UsuarioRepository.findByEmail(email)
    }
}

export default new LoginService()