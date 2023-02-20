const Servico = require('../service/servico-app');

exports.getTesteInicial = async (req, res) => {
    await Servico
        .RetornarTesteInicialApi
        .then((retorno) => res.send(retorno))
        .catch((erro) => res.send(erro))
}