const express = require('express')
const Controlador = require('../controller/controlador-app')

const router = express.Router()

// Inicial
router.get('/', Controlador.getTesteInicial)

// Usuário
router.get('/usuario', Controlador.getUsuario)
router.post('/usuario', Controlador.postUsuario)
router.put('/usuario', Controlador.putUsuario)

// Permissão
router.get('/permissao', Controlador.getPermissao)
router.post('/permissao', Controlador.postPermissao)
router.delete('/permissao', Controlador.deletePermissao)

// Acessibilidade
router.get('/acessibilidade', Controlador.getAcessibilidade)
router.post('/acessibilidade', Controlador.postAcessibilidade)
router.put('/acessibilidade', Controlador.putAcessibilidade)

// Função
router.get('/funcao', Controlador.getFuncao)
router.post('/funcao', Controlador.postFuncao)
router.put('/funcao', Controlador.putFuncao)

// Equipe
router.get('/equipe', Controlador.getEquipe)
router.post('/equipe', Controlador.postEquipe)
router.put('/equipe', Controlador.putEquipe)

module.exports = router