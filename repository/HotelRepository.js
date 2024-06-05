import { Usuario } from "../models/usuario.js"
import { hotel, Hotel } from "./../models/hotel.js"
import UsuarioRepository from "./UsuarioRepository.js"
const historicoDeBusca = []

class HotelRepository {
    async findAll(page) {
        console.log("ACHANDO PÁGINA: ", page)
        return await Hotel.find().skip(page*10).limit(10)
    }
    async create(nome, endereco, desc, tipo) {

        console.log("CRIANDO HOTEL")
        const newHotel = new Hotel({
            "nome": nome,
            "endereco": endereco,
            "desc": desc,
            "tipo": tipo,
            num_avaliacao: 0
        })
    }
    async update(id, nome, endereco, desc, tipo) {
        console.log("ATUALIZANDO HOTELS")
        return await Hotel.findByIdAndUpdate({ _id: id }, {
            $set: {
                nome: nome,
                endereco: endereco,
                desc: desc,
                tipo: tipo,
            }
        })
    }
    async delete(id) {
        console.log("DELETANDO HOTEL")
        return await Hotel.findByIdAndDelete(id)
    }
    async findByPessoaId(idPessoa){
        console.log("ACHANDO FAVORITOS")
        const pessoa = await UsuarioRepository.findById(idPessoa)
        if(!pessoa) return
        console.log(pessoa)
        return pessoa.favorito
    }
    async saveFav(idHotel, idPessoa){
        console.log("SALVANDO FAVORITOS")
        const pessoa = await UsuarioRepository.findById(idPessoa)
        console.log(pessoa)
        if(!pessoa) return

        const hotel = await Hotel.findById(idHotel)
        console.log(hotel)
        if(!hotel) return
        
        pessoa.favorito.push(hotel)

        await pessoa.save()
        
        return pessoa
    }
    async removeFav(idHotel, idPessoa){
        console.log("REMOVENDO FAVORITOS")
        const pessoa = await UsuarioRepository.findById(idPessoa)
        if(!pessoa) return
        const hotelFav = pessoa.favorito.id(idHotel)
        if(!hotelFav) return 
        await hotelFav.deleteOne()
        const pessoaAtualizada =await pessoa.save()
        return pessoaAtualizada
    }
    async findById(idHotel){
        
        historicoDeBusca.push(idHotel)
        const hotel = await Hotel.findById(idHotel)
        return hotel
    }
    async findRecents(){
        try {
            const hotels = [];
    
    
            if (historicoDeBusca.length === 0) {
                return hotels; 
            }
    
            const hoteis = historicoDeBusca.map(id => Hotel.findById(id))
            const hotelsProntos = await Promise.all(hoteis)
    
            hotelsProntos.forEach(hotel => {
                if (hotel) {
                    hotels.push(hotel)
                }
            })
    
            return hotels;
        } catch (error) {
            console.error("Erro:", error)
        }
    }
    async findNear(coordenadas){
        const response = await Hotel.aggregate([
            {$geoNear:{
                near:{
                    type: "Point",
                    coordinates: [coordenadas.longitude, coordenadas.latitude]
                },
                distanceField: "distance",
                spherical: true,
                maxDistance: 10000000,
            }}
        ])
        return response
    }
}

export default new HotelRepository()