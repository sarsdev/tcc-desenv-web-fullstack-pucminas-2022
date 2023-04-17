require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const { rotasSegur } = require('./routes/rotas-segur')
const rotasApp = require('./routes/rotas-app')
const rotasDev = require('./routes/rotas-dev')

const app = express()

mongoose.connect(process.env.DB_CONNECTION).then(() => console.info('DB Connected'))
mongoose.connection.on('error', err => console.error(`DB connection error: ${err.message}`))

app.use(cors())
app.use(bodyParser.json())
app.use('/', [rotasApp, rotasSegur])
app.use('/dev', rotasDev)

app.listen(process.env.PORT, () => {
    console.info(`Servidor ativo na porta ${process.env.PORT}`)
})