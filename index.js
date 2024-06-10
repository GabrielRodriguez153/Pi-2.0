import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import PageController from "./controllers/PageController.js";
import fs from 'fs'
import { Hotel } from './models/hotel.js'
import {Usuario} from "./models/usuario.js"
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



const port = 8000;
const adicionarDados = async () =>{

    let countHotel = await Hotel.countDocuments()
    let countUsuario = await Usuario.countDocuments()
    if (countHotel === 0) {
      
        const hoteis = fs.readFileSync('public/json/sightinn.hotels.json')

        const hotelsData = JSON.parse(hoteis)
        await Hotel.insertMany(hotelsData)
        countHotel = await Hotel.countDocuments()
        if (countHotel > 0) {
          console.log('Hóteis inseridos com sucesso')
        } else {
            console.error('Não foi possível adicionar os hotéis:', err)
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
          console.error('Não foi possível adicionar o usuário:', err)
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

