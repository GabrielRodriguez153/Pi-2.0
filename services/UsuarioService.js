import UsuarioRepository from "./../repository/UsuarioRepository.js"

class UsuarioService{
    async findById(id){
        return await UsuarioRepository.findById(id)
    }

    async save(email, senha, telefone){
        return await UsuarioRepository.save(email, senha)
    }
    async findByEmail(email){
        return await UsuarioRepository.findByEmail(email)
    }

}

export default new UsuarioService()