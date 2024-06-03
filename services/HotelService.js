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
        const filterTrueValues = (obj) => {
            return Object.keys(obj)
                .filter(key => obj[key] === true)
                .map(key => ({ [`quarto.comodidades.${key}`]: true }))
        }
        
        return await HotelRepository.findByAvaliacao(nEstrelas, filterTrueValues(comodidades))
    }
    async findByTipo(tipo){
        return await HotelRepository.findByTipo(tipo)
    }
    async findByLocalidade(localidade){
        return await HotelRepository.findByLocalidade(localidade)
    }
    async findByCidade(cidade){
        return await HotelRepository.findByCidade(cidade)
    }
    async findHotelVago(entrada, saida){
        return await HotelRepository.findHotelVago(entrada, saida)
    }

}
export default new HotelService()