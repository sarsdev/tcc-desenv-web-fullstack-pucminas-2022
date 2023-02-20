const express = require('express');
const Controlador = require('../controller/controlador-app');

const router = express.Router();

router.get("/", Controlador.getTesteInicial);

module.exports = router;