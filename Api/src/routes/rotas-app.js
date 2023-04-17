const express = require('express')
const Controlador = require('../controller/controlador-app')
const ControladorSegur = require('../controller/controlador-segur')

const router = express.Router()

// Inicial
router.get('/', Controlador.getTesteInicial)

// Usuário
router.get('/usuario', ControladorSegur.validaToken, Controlador.getUsuario)
router.post('/usuario', ControladorSegur.validaToken, Controlador.postUsuario)
router.put('/usuario', ControladorSegur.validaToken, Controlador.putUsuario)

// Permissão
router.get('/permissao', ControladorSegur.validaToken, Controlador.getPermissao)
router.post('/permissao', ControladorSegur.validaToken, Controlador.postPermissao)
router.delete('/permissao', ControladorSegur.validaToken, Controlador.deletePermissao)

// Acessibilidade
router.get('/acessibilidade', ControladorSegur.validaToken, Controlador.getAcessibilidade)
router.post('/acessibilidade', ControladorSegur.validaToken, Controlador.postAcessibilidade)
router.put('/acessibilidade', ControladorSegur.validaToken, Controlador.putAcessibilidade)

// Função
router.get('/funcao', ControladorSegur.validaToken, Controlador.getFuncao)
router.post('/funcao', ControladorSegur.validaToken, Controlador.postFuncao)
router.put('/funcao', ControladorSegur.validaToken, Controlador.putFuncao)

// Equipe
router.get('/equipe', ControladorSegur.validaToken, Controlador.getEquipe)
router.post('/equipe', ControladorSegur.validaToken, Controlador.postEquipe)
router.put('/equipe', ControladorSegur.validaToken, Controlador.putEquipe)

module.exports = router