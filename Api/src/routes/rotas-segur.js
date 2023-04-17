const express = require('express')
const Controlador = require('../controller/controlador-segur')

const router = express.Router()

router.post('/token', Controlador.validaDados, Controlador.postToken)

exports.rotasSegur = router