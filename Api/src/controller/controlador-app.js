const Servico = require('../service/servico-app');

exports.getTesteInicial = async (req, res) => {
    await Servico
        .RetornarTesteInicialApi
        .then((retorno) => res.send(retorno))
        .catch((erro) => res.send(erro))
}

exports.getUsuario = (req, res) => {
    res.send(Servico.ListaUsuarios())
}

exports.setUsuario = (req, res) => {
    if(Servico.AtualizaDadosUsuario(req.body)) {
        res.sendStatus(200)
    } else {
        res.sendStatus(400)
    }
}

exports.getAcessoUsuario = (req, res) => {
    res.send(Servico.RetornaAcessoUsuario(req.query.email))
}

exports.setAcessoUsuario = (req, res) => {
    if(Servico.AtualizaSenhaUsuario(req.body)) {
        res.sendStatus(200)
    } else {
        res.sendStatus(400)
    }
}

exports.getLogAcessoUsuario = (req, res) => {
    res.send(Servico.ListaLogAcessoUsuarios())
}

exports.setLogAcessoUsuario = (req, res) => {
    if(Servico.AtualizaLogAcessoUsuario(req.body)) {
        res.sendStatus(200)
    } else {
        res.sendStatus(400)
    }
}

exports.getProjetosUsuario = (req, res) => {
    res.send(Servico.RetornaProjetosUsuario(req.query.email))
}

exports.AutenticacaoUsuario = (req, res) => {
    if(Servico.UsuarioAutenticado(req.body)) {
        res.sendStatus(200)
    } else {
        res.sendStatus(400)
    }
}