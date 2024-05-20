import {usuario, Usuario} from "./../models/usuario.js"

class UsuarioRepository{
    async findById(id){
        return await Usuario.findById(id)
    }

}

export default new UsuarioRepository()