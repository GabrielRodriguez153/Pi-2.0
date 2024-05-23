import { Hotel } from "../models/hotel.js"
import HotelRepository from "./../repository/HotelRepository.js"

class HotelService{
    async findAll(){
        return await HotelRepository.findAll()
    }
    async create(nome, endereco, desc){
        return await HotelRepository.create(nome, endereco, desc, tipo)
    }
    async update(id, nome, endereco, desc){
        return await HotelRepository.update(id, nome, endereco, desc, tipo)

    }
    async delete(id){
        return await HotelRepository.delete(id);
    }
    async findByQuartoPreco(preco, preco2){
        return await HotelRepository.findByQuartoPreco(preco, preco2)
    }
    async findByAvaliacao(nEstrelas, comodidades){
        const listaComodidades = Object.values(comodidades);


        return await HotelRepository.findByAvaliacao(nEstrelas, listaComodidades)
    }
}
export default new HotelService()