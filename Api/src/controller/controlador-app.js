const Servico = require('../service/servico-app')

// Inicial

exports.getTesteInicial = async (req, res) => {
    await Servico
        .RetornarTesteInicialApi
        .then((retorno) => res.send(retorno))
        .catch((erro) => res.send(erro))
}

// Usuário

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

// Permissão

exports.getPermissao = (req, res) => {
    res.send(Servico.ListaPermissoes())
}

exports.setPermissao = (req, res) => {
    if(Servico.AtualizaPermissao(req.body)) {
        res.sendStatus(200)
    } else {
        res.sendStatus(400)
    }
}

exports.removePermissao = (req, res) => {
    if(Servico.RemovePermissao(req.query.sequencial)) {
        res.sendStatus(200)
    } else {
        res.sendStatus(400)
    }
}

// Acessibilidade

exports.getAcessibilidade = (req, res) => {
    res.send(Servico.ListaPadroesAcessibilidade(req.query.email))
}

exports.setAcessibilidade = (req, res) => {
    if(Servico.AtualizaPadroesAcessibilidade(req.body)) {
        res.sendStatus(200)
    } else {
        res.sendStatus(400)
    }
}

// Função

exports.getFuncao = async (req, res) => {
    let retorno = await Servico.ListaFuncoes(req.query)
    if(retorno.erro) {
        res.json({ MsgErro: retorno.msg })
    }
    res.json(retorno.dados)
}

exports.postFuncao = async (req, res) => {
    let retorno = await Servico.InsereFuncao(req.body)
    if(retorno.erro) {
        res.json({ MsgErro: retorno.msg })
    }
    res.json(retorno.dados)
}

exports.putFuncao = async (req, res) => {
    let retorno = await Servico.AtualizaFuncao(req.body)
    if(retorno.erro) {
        res.json({ MsgErro: retorno.msg })
    }
    res.json(retorno.dados)
}

// Equipe

exports.getEquipe = (req, res) => {
    res.send(Servico.ListaEquipes(req.query))
}

exports.setEquipe = (req, res) => {
    if(Servico.AtualizaEquipe(req.body)) {
        res.sendStatus(200)
    } else {
        res.sendStatus(400)
    }
}

exports.getUsuarioEquipe = (req, res) => {
    res.send(Servico.ListaUsuariosEquipe(req.query))
}

exports.setUsuarioEquipe = (req, res) => {
    if(Servico.AtualizaUsuarioEquipe(req.query, req.body)) {
        res.sendStatus(200)
    } else {
        res.sendStatus(400)
    }
}

exports.removeUsuarioEquipe = (req, res) => {
    if(Servico.RemoveUsuarioEquipe(req.query)) {
        res.sendStatus(200)
    } else {
        res.sendStatus(400)
    }
}