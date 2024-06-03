import express from "express"
import mongoose from "mongoose"
import session from "express-session"
import PageController from "./controllers/PageController.js"
const app = express()

app.use(session({
    secret: "sightinn",
    cookie: { maxAge: 7200000},
    saveUninitialized: false,
    resave: false
}))

app.use(express.urlencoded({ extended: false}))
app.use(express.json())

const mongoURI = "mongodb://localhost:27017/sightinn";

mongoose.connect(mongoURI)
.then(() => console.log("MongoDB conectado com sucesso!"))
.catch(err => console.error("Erro de conexão MongoDB:", err));

app.set("view engine", "ejs")

app.use(express.static('public'))

app.get("/", function(req, res) {
    res.render("index")
})

const port = 8000;
app.listen(port, function (erro) {
    if (erro) {
        console.log("Ocorreu um erro!")
    } else {
        console.log(`Servidor iniciado com sucesso na porta ${port}!`)
    }
})