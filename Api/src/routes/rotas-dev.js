const express = require('express')
const Controlador = require('../controller/controlador-dev')
const ControladorSegur = require('../controller/controlador-segur')

const router = express.Router()

// Aplicacao
router.get('/aplicacao', ControladorSegur.validaToken, Controlador.getAplicacao)
router.post('/aplicacao', ControladorSegur.validaToken, Controlador.postAplicacao)
router.put('/aplicacao', ControladorSegur.validaToken, Controlador.putAplicacao)
router.delete('/aplicacao', ControladorSegur.validaToken, Controlador.deleteAplicacao)

// Tema
router.get('/tema', ControladorSegur.validaToken, Controlador.getTema)
router.post('/tema', ControladorSegur.validaToken, Controlador.postTema)
router.put('/tema', ControladorSegur.validaToken, Controlador.putTema)
router.delete('/tema', ControladorSegur.validaToken, Controlador.deleteTema)

module.exports = router