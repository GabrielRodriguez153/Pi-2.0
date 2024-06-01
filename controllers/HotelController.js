import HotelService from "./../services/HotelService.js"


class HotelController{
    async findAll(page){
        return await HotelService.findAll(page)
    }
    // async create(nome, endereco, desc, tipo){
    //     return await HotelService.create(nome, endereco, desc, tipo)
    // }

    // async update(id){
    //     return await HotelService.update(id, nome, endereco, desc, tipo)
    // }
    // async delete(id){
    //     return await HotelService.delete(id)
    // }
    async findById(hotelId){
        return await HotelService.findById(hotelId)
    }

    async saveFav(idHotel, idPessoa){
        return await HotelService.saveFav(idHotel, idPessoa)
    }
    async removeFav(idHotel, idPessoa){
        return await HotelService.removeFav(idHotel, idPessoa)
    }
    async findByPessoaId(idPessoa){
        return await HotelService.findByPessoaId(idPessoa)
    }
    async findRecents(){
        return await HotelService.findRecents()
    }
    async findNear(coordenadas){
        return await HotelService.findNear(coordenadas)
    }

}
export default new HotelController()