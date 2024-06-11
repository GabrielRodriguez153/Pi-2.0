import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import PageController from "./controllers/PageController.js";
import fs from 'fs'
import EnglishController from "./controllers/EnglishController.js"
import { Hotel, hotel } from './models/hotel.js'
import {Usuario} from "./models/usuario.js"
import { HotelEnglish } from "./models/hotelEnglish.js";
const app = express();

app.use(
  session({
    secret: "sightinn",
    cookie: { maxAge: 7200000 },
    saveUninitialized: false,
    resave: false,
  })
);

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use((req, res, next) => {
  res.locals.url = req.url;
  res.locals.session = req.session;
  if (req.session) {
    if (req.session.lastUrl) {
      res.locals.lastUrl = req.session.lastUrl;
    }
    req.session.lastUrl = req.originalUrl;
  }
  next();
});

const mongoURI = "mongodb://localhost:27017/sightinn";

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB conectado com sucesso!"))
  .catch((err) => console.error("Erro de conexão MongoDB:", err));


app.use("/", PageController)
app.use("/eng", EnglishController)


const port = 8000;
const adicionarDados = async () =>{

    let countHotel = await Hotel.countDocuments()
    let countUsuario = await Usuario.countDocuments()
    let countEnglishHotel = await HotelEnglish.countDocuments()
    if(countEnglishHotel === 0){
      const hotelEnglish = fs.readFileSync('public/json/english.hotels.json')
      const hotelsDataEnglish = JSON.parse(hotelEnglish)
      await HotelEnglish.insertMany(hotelsDataEnglish)
      countEnglishHotel = await HotelEnglish.countDocuments()
      if(countEnglishHotel > 0){
        console.log("Hotels in english updated with success")
      }else{
        console.log("Error, was not possible to insert data in hotels.")
      }
    }
    if (countHotel === 0) {
      
        const hoteis = fs.readFileSync('public/json/sightinn.hotels.json')

        const hotelsData = JSON.parse(hoteis)
        await Hotel.insertMany(hotelsData)
        countHotel = await Hotel.countDocuments()
        if (countHotel > 0) {
          console.log('Hóteis inseridos com sucesso')
        } else {
            console.error('Não foi possível adicionar os hotéis:')
        }
    } 
    if(countUsuario === 0){
      const usuario = fs.readFileSync('public/json/sightinn.usuario.json')
      const usuarioData = JSON.parse(usuario)
      await Usuario.create(usuarioData)
      countUsuario = await Usuario.countDocuments()

      if (countUsuario > 0) {
        console.log('Usuário inserido com sucesso')
      } else {
          console.error('Não foi possível adicionar o usuário:')
      }
    }
}

app.listen(port, function (erro) {
  if (erro) {
    console.log("Ocorreu um erro!");
  } else {
    console.log(`Servidor iniciado com sucesso na porta ${port}!`);
    adicionarDados()
  }
});

