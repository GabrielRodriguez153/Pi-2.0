import{hotel, Hotel} from "./../models/hotel.js"

class HotelRepository{
    async FindAll(){
        return await Hotel.find()
    }

}


export default new HotelRepository()