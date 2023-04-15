const express = require('express')
const Controlador = require('../controller/controlador-dev')

const router = express.Router()

// Aplicacao
router.get('/aplicacao', Controlador.getAplicacao)
router.post('/aplicacao', Controlador.postAplicacao)
router.put('/aplicacao', Controlador.putAplicacao)
router.delete('/aplicacao', Controlador.deleteAplicacao)

// Tema
router.get('/tema', Controlador.getTema)
router.post('/tema', Controlador.postTema)
router.put('/tema', Controlador.putTema)
router.delete('/tema', Controlador.deleteTema)

module.exports = router