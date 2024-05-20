import { Hotel } from "../models/hotel.js"
import HotelRepository from "./../repository/HotelRepository.js"

class HotelService{
    async findAll(){
        return await HotelRepository.findAll()
    }
    async create(nome, endereco, desc){
        return await HotelRepository.create(nome, endereco, desc)
    }
    async update(id, nome, endereco, desc){
        return await HotelRepository.update(id, nome, endereco, desc)

    }
    async delete(id){
        return await HotelRepository.delete(id);
    }
}
export default new HotelService()