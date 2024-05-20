import UsuarioRepository from "./../repository/UsuarioRepository.js"

class UsuarioService{
    async findById(id){
        return await UsuarioRepository.findById(id)
    }


}

export default new UsuarioService()