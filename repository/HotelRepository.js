import { hotel, Hotel } from "./../models/hotel.js"

class HotelRepository {
    async findAll() {
        return await Hotel.find()
    }
    async create(nome, endereco, desc, tipo) {
        console.log("Criando Hotel")
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
    async findByQuartoPreco(preco, preco2) {
        try {
            const hotels = await Hotel.aggregate([
                { $unwind: "$quarto" },
                {
                    $match: {
                        "quarto.valor": {
                            $gte: preco,
                            $lte: preco2
                        }
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                        tipo: { $first: "$tipo" },
                        nome: { $first: "$nome" },
                        endereco: { $first: "$endereco" },
                        desc: { $first: "$desc" },
                        avaliacao: { $first: "$avaliacao" },
                        num_avaliacao: { $first: "$num_avaliacao" },
                        image: { $first: "$image" },
                        quarto: { $push: "$quarto" } 
                    }
                }
            ]);
            return hotels;
        } catch (err) {
            console.error('Error finding hotels:', err);
            throw err;
        }
    }
    async findByAvaliacao(nEstrelas, comodidades){
        const comodidadesTrue= []
        await comodidades.forEach(comodidade =>{
            if(comodidade){
                const condition = {};
                condition[`quarto.comodidades.${comodidade}`] = true;
                comodidadesTrue.push(condition)
            }
        })
        const hotelAvaliado = await Hotel.aggregate([
            {$unwind: "$quarto"},
            {
                $match:{
                    "quarto.avaliacao.avaliacaoGeral":{ $gte: nEstrelas},
                    $and: comodidadesTrue,
                }
            }
        ])
    }
}

export default new HotelRepository()