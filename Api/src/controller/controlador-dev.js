const Servico = require('../service/servico-dev')

// Aplicacao

exports.getAplicacao = async (req, res) => {
    let retorno = await Servico.ListaAplicacoes(req.query)
    if(retorno.erro) {
        res.json({ MsgErro: retorno.msg })
    }
    res.json(retorno.dados)
}

exports.postAplicacao = async (req, res) => {
    let retorno = await Servico.InsereAplicacao(req.body)
    if(retorno.erro) {
        res.json({ MsgErro: retorno.msg })
    }
    res.json(retorno.dados)
}

exports.putAplicacao = async (req, res) => {
    let retorno = await Servico.AtualizaAplicacao(req.body)
    if(retorno.erro) {
        res.json({ MsgErro: retorno.msg })
    }
    res.json(retorno.dados)
}

exports.deleteAplicacao = async (req, res) => {
    let retorno = await Servico.RemoveAplicacao(req.query)
    if(retorno.erro) {
        res.json({ MsgErro: retorno.msg })
    }
    res.json(retorno.dados)
}

// Tema

exports.getTema = async (req, res) => {
    let retorno = await Servico.ListaTema(req.query)
    if(retorno.erro) {
        res.json({ MsgErro: retorno.msg })
    }
    res.json(retorno.dados)
}

exports.postTema = async (req, res) => {
    let retorno = await Servico.InsereTema(req.body)
    if(retorno.erro) {
        res.json({ MsgErro: retorno.msg })
    }
    res.json(retorno.dados)
}

exports.putTema = async (req, res) => {
    let retorno = await Servico.AtualizaTema(req.body)
    if(retorno.erro) {
        res.json({ MsgErro: retorno.msg })
    }
    res.json(retorno.dados)
}

exports.deleteTema = async (req, res) => {
    let retorno = await Servico.RemoveTema(req.query)
    if(retorno.erro) {
        res.json({ MsgErro: retorno.msg })
    }
    res.json(retorno.dados)
}