import{hotel, Hotel} from "./../models/hotel.js"

class HotelRepository{
    async findAll(){
        console.log("Hotels")
        return await Hotel.find()
    }
    async create(nome, endereco, desc){
        console.log("Criando Hotel")
        const newHotel = new Hotel({
            "nome": nome,
            "endereco": endereco,
            "desc": desc,
            num_avaliacao: 0
        })
    }
    async update(id, nome, endereco, desc){
        return await Hotel.findByIdAndUpdate({_id: id}, {$set:{
            nome: nome,
            endereco: endereco,
            desc: desc
        }})
    }
    async delete(id){
        return await Hotel.findByIdAndDelete(id)
    }
}

export default new HotelRepository()