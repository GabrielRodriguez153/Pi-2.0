import express from "express"
import mongoose from "mongoose"
import session from "express-session"
import PageController from "./controllers/PageController.js"
import LoginController from "./controllers/LoginController.js"
const app = express()

app.use(session({
    secret: "sightinn",
    cookie: { maxAge: 7200000},
    saveUninitialized: false,
    resave: false
}))

app.use(express.urlencoded({ extended: false}))
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/sightinn")
app.use("/", PageController)
app.use("/", LoginController)
app.set("view engine", "ejs")

app.use(express.static('public'))

app.get("/", function(req, res) {
    res.render("index")
})

app.listen(8000, function (erro) {
    if (erro) {
        console.log("Ocorreu um erro!")
    } else {
        console.log("Servidor iniciado com sucesso!")
    }
})
