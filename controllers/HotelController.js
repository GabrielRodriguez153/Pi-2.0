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
}
export default new HotelController()