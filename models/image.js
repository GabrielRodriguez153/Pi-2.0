import mongoose from 'mongoose';

const image = new mongoose.Schema({
    url: String,
});

const Image = mongoose.model('Image', image);

export { image, Image };
