import mongoose from 'mongoose';

const comodidades= new mongoose.Schema({
    wifi: Boolean,
    estacionamento: Boolean,
    arcondicionado: Boolean,
    secador: Boolean,
    Tv_Smart: Boolean,
    varanda: Boolean,
});

const Comodidades = mongoose.model('comodidades', comodidades);

export { comodidades, Comodidades };
