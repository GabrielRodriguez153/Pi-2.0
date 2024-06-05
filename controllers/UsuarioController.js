import UsuarioService from "./../services/UsuarioService.js"

class UsuarioController{
    async save(email,senha,telefone){
        return await UsuarioService.save(email,senha,telefone)
    }
    async findById(id){{
        return await UsuarioService.findById(id)
    }}
    
    async findOne(email){
        return await UsuarioService.findByEmail(email)
    }
}
export default new UsuarioController()