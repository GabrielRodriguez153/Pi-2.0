import { Usuario } from "../models/usuario.js"
import { hotel, Hotel } from "./../models/hotel.js"
import UsuarioRepository from "./UsuarioRepository.js"
let historicoDeBusca = []

class HotelRepository {
    async findAll(page) {
        return await Hotel.find().skip(page*10).limit(12)
    }
    async create(nome, endereco, desc, tipo) {

        const newHotel = new Hotel({
            "nome": nome,
            "endereco": endereco,
            "desc": desc,
            "tipo": tipo,
            num_avaliacao: 0
        })
    }
    async update(id, nome, endereco, desc, tipo) {
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
        return await Hotel.findByIdAndDelete(id)
    }
    async findByPessoaId(idPessoa){
        const pessoa = await UsuarioRepository.findById(idPessoa)
        if(!pessoa) return
        return pessoa.favorito
    }
    async saveFav(idHotel, idPessoa){
        const pessoa = await UsuarioRepository.findById(idPessoa)
        if(!pessoa) return

        const hotel = await Hotel.findById(idHotel)
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
        if (!historicoDeBusca.includes(idHotel)) {
            historicoDeBusca.push(idHotel)
        }
        
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
                maxDistance: 100000000000000000,
            }}
        ])
        return response
    }
    clearRecents(){
        historicoDeBusca = []
    }
}

export default new HotelRepository()