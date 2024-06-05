import {usuario, Usuario} from "./../models/usuario.js"

class UsuarioRepository{
    async findById(id){
        return await Usuario.findById(id)
    }
    async save(email, senha, telefone){

        const user =  new Usuario({
            email: email,
            senha: senha,
            telefone: telefone
        })
        return await user.save()
    }
    async findByEmail(email){
        return await Usuario.findOne({email : email})
    }

}

export default new UsuarioRepository()