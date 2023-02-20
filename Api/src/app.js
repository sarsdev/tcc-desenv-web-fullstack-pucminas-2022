require('dotenv').config()
const express = require('express')
const rotas = require('./routes/rotas-app')

const app = express()

app.use("/", rotas);

app.listen(process.env.PORT, () => {
    console.info(`Servidor ativo na porta ${process.env.PORT}`);
})