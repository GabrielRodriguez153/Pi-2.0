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

    }
}
export default new HotelController()