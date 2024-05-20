import UsuarioService from "./../services/UsuarioService.js"

class UsuarioController{
    async findById(id){
        return await UsuarioService.findById(id)
        
    }
}
export default new UsuarioController()