const express = require('express');
const Controlador = require('../controller/controlador-app');

const router = express.Router();

// Inicial
router.get("/", Controlador.getTesteInicial);

// Usuário
router.get("/usuario", Controlador.getUsuario);
router.get("/usuario/acesso", Controlador.getAcessoUsuario);
router.get("/usuario/projeto", Controlador.getProjetosUsuario);
router.get("/usuario/acesso/log", Controlador.getLogAcessoUsuario);
router.post("/usuario", Controlador.setUsuario);
router.post("/usuario/acesso", Controlador.setAcessoUsuario);
router.post("/usuario/acesso/log", Controlador.setLogAcessoUsuario);
router.post("/usuario/acesso/autenticacao", Controlador.AutenticacaoUsuario);


module.exports = router;