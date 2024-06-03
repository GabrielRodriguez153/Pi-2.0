import UsuarioService from "./../services/UsuarioService.js"
class UsuarioController{
    async findById(id){
        return await UsuarioService.findById(id)
    }
    async save(email, senha, telefone){
        console.log("teste")

        return await UsuarioService.save(email,senha, telefone)
    }
}
export default new UsuarioController()