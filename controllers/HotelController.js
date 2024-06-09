import HotelService from "./../services/HotelService.js"

class HotelController{
    async findAll(){
        return await HotelService.findAll()
    }
    async create(){
        return await HotelService.create(nome, endereco, desc, tipo)
    }

    async update(){
        return await HotelService.update(id, nome, endereco, desc, tipo)
    }
    async delete(){
        return await HotelService.delete(id)
    }
    async findByQuartoPreco(preco, preco2){
        return await HotelService.findByQuartoPreco(preco, preco2)
    }
    async findByAvaliacao(nEstrelas, comodidades){
        return await HotelService.findByAvaliacao(nEstrelas, comodidades)
    }
    async findByTipo(tipo){
        return await HotelService.findByTipo(tipo)
    }
    async findByLocalidade(localidade){
        return await HotelService.findByLocalidade(localidade)
    }
    async findByCidade(cidade){
        return await HotelService.findByCidade(cidade)
    }
    async findHotelVago(entrada, saida){
        return await HotelService.findHotelVago(entrada, saida)
    }
}
export default new HotelController()