require('dotenv').config()
const { DB_URL } = process.env
const express = require('express')
const app = express()

app.use(express.json())

const rTelegram = require("./routers/telegram.router") 

app.use(rTelegram)

app.listen(3000, () => {
    require('./config/connectDB')(DB_URL)
    console.log("Server run on 3000 port");
})