require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const rotas = require('./routes/rotas-app')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use("/", rotas);

app.listen(process.env.PORT, () => {
    console.info(`Servidor ativo na porta ${process.env.PORT}`);
})