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
            console.error('Erro:', err)
            throw err;
        }
    }
    async findByAvaliacao(nEstrelas, comodidadesTrue){
        try {
            const pesquisa = {
                'avaliacao.avaliacaoGeral': { $gte: nEstrelas },
                $and: comodidadesTrue
            }
    
            const hotelAvaliado = await Hotel.aggregate([
                { $unwind: "$quarto" },
                { $match: pesquisa }
            ])

            return hotelAvaliado
        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }
    }
    async findByTipo(tipo){
        return await Hotel.find({tipo: tipo})
    }
    async findByLocalidade(localidade){
        return await Hotel.find({localidade: localidade})
    }
    async findByCidade(cidade){
        return await Hotel.find({cidade: "Registro"})
    }
    async findHotelVago(entrada, saida) {
        try {
            const hotelVago = await Hotel.aggregate([
                { $unwind: "$quarto" },
                {
                    $match: {
                        $and: [
                            { "quarto.alugado.data_checkin": { $lte: saida } },
                            { "quarto.alugado.data_checkout": { $lte: entrada } },
                        ]
                    }
                }
            ])
            return hotelVago;
        } catch (error) {
            throw new Error(`Error finding vacant hotels: ${error}`);
        }
    }
}

export default new HotelRepository()