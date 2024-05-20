import mongoose from 'mongoose';

const avaliacao = new mongoose.Schema({
    avaliacaoGeral: Number,
    avaliacaoLimpeza: Number,
    avaliacaoLocalizacao: Number,
    avaliacaoCustoBeneficio: Number,
    avaliacaoComunicacao: Number
});

const Avaliacao = mongoose.model('Avaliacao', avaliacao);

export { avaliacao, Avaliacao };
