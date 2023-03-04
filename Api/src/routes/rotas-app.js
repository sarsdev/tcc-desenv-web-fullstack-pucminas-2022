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

// Permissão
router.get("/permissao", Controlador.getPermissao);
router.post("/permissao", Controlador.setPermissao);
router.delete("/permissao", Controlador.removePermissao);

// Acessibilidade
router.get("/acessibilidade", Controlador.getAcessibilidade);
router.post("/acessibilidade", Controlador.setAcessibilidade);

// Função
router.get("/funcao", Controlador.getFuncao);
router.post("/funcao", Controlador.setFuncao);

// Equipe
router.get("/equipe", Controlador.getEquipe);
router.get("/equipe/usuario", Controlador.getUsuarioEquipe);
router.post("/equipe", Controlador.setEquipe);
router.post("/equipe/usuario", Controlador.setUsuarioEquipe);
router.delete("/equipe/usuario", Controlador.removeUsuarioEquipe);

module.exports = router;