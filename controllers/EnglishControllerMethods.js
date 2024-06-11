import EnglishService from "./../services/EnglishService.js"
class EnglishControllerMethods{
    
    async findAll(page){
        return await EnglishService.findAll(page)
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
        return await EnglishService.findById(hotelId)
    }

    async saveFav(idHotel, idPessoa){
        return await EnglishService.saveFav(idHotel, idPessoa)
    }
    async removeFav(idHotel, idPessoa){
        return await EnglishService.removeFav(idHotel, idPessoa)
    }
    async findByPessoaId(idPessoa){
        return await EnglishService.findByPessoaId(idPessoa)
    }
    async findRecents(){
        return await EnglishService.findRecents()
    }
    async findNear(coordenadas){
        return await EnglishService.findNear(coordenadas)
    }
    clearRecents(){
        return EnglishService.clearRecents()
    }

}
export default new EnglishControllerMethods()