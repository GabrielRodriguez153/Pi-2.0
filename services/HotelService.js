import { Hotel } from "../models/hotel.js"
import HotelRepository from "./../repository/HotelRepository.js"

class HotelService{

    async findAll(page){
        return await HotelRepository.findAll(page)
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
        return await HotelRepository.findById(idHotel)
    }
    async findByPessoaId(idPessoa){
        return await HotelRepository.findByPessoaId(idPessoa)
    }
    async saveFav(idHotel, idPessoa){
        return await HotelRepository.saveFav(idHotel, idPessoa)
    }
    async removeFav(idHotel, idPessoa){
        return await HotelRepository.removeFav(idHotel, idPessoa)
    }
    async findRecents(){
        return await HotelRepository.findRecents()
    }
    async findNear(coordenadas){
        return await HotelRepository.findNear(coordenadas)
    }
    clearRecents(){
        return HotelRepository.clearRecents()
    }    
}
export default new HotelService()