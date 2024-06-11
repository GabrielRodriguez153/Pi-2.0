import EnglishRepository from "./../repository/EnglishRepository.js"
class EnglishService{

    async findAll(page){
        return await EnglishRepository.findAll(page)
    }
    // async create(nome, endereco, desc){
    //     return await HotelRepository.create(nome, endereco, desc, tipo)
    // }
    // async update(id, nome, endereco, desc){
    //     return await HotelRepository.update(id, nome, endereco, desc, tipo)

    // }
    // async delete(id){
    //     return await HotelRepository.delete(id);
    // }
    async findById(idHotel){
        return await EnglishRepository.findById(idHotel)
    }
    async findByPessoaId(idPessoa){
        return await EnglishRepository.findByPessoaId(idPessoa)
    }
    async saveFav(idHotel, idPessoa){
        return await EnglishRepository.saveFav(idHotel, idPessoa)
    }
    async removeFav(idHotel, idPessoa){
        return await EnglishRepository.removeFav(idHotel, idPessoa)
    }
    async findRecents(){
        return await EnglishRepository.findRecents()
    }
    async findNear(coordenadas){
        return await EnglishRepository.findNear(coordenadas)
    }
    clearRecents(){
        return EnglishRepository.clearRecents()
    }    
}
export default new EnglishService()