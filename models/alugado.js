import mongoose from 'mongoose';

const alugado = new mongoose.Schema({
    data_checkin: Date,
    data_checkout: Date,
});

const Alugado = mongoose.model('alugado', alugado);

export { alugado, Alugado };
