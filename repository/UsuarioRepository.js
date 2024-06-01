import {usuario, Usuario} from "./../models/usuario.js"

class UsuarioRepository{
    async findById(id){
        return await Usuario.findById(id)
    }
    async save(email, senha, telefone){
        console.log("teste")

        const user =  new Usuario({
            email: email,
            senha: senha,
            telefone: telefone
        })
        return await user.save()
    }

}

export default new UsuarioRepository()