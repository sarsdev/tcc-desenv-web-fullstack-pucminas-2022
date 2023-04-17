const Servico = require('../service/servico-app')

// Inicial

exports.getTesteInicial = async (req, res) => {
    await Servico
        .RetornarTesteInicialApi
        .then((retorno) => res.send(retorno))
        .catch((erro) => res.send(erro))
}

// Usuário

exports.getUsuario = async (req, res) => {
    let retorno = await Servico.ListaUsuarios(req.query)
    RetornaRequisicao(res, retorno)
}

exports.postUsuario = async (req, res) => {
    let retorno = await Servico.InsereUsuario(req.body)
    RetornaRequisicao(res, retorno)
}

exports.putUsuario = async (req, res) => {
    let retorno = await Servico.AtualizaUsuario(req.body)
    RetornaRequisicao(res, retorno)
}

// Permissão

exports.getPermissao = async (req, res) => {
    let retorno = await Servico.ListaPermissoes(req.query)
    RetornaRequisicao(res, retorno)
}

exports.postPermissao = async (req, res) => {
    let retorno = await Servico.InserePermissao(req.body)
    RetornaRequisicao(res, retorno)
}

exports.deletePermissao = async (req, res) => {
    let retorno = await Servico.RemovePermissao(req.query)
    RetornaRequisicao(res, retorno)
}

// Acessibilidade

exports.getAcessibilidade = async (req, res) => {
    let retorno = await Servico.ListaPadroesAcessibilidade(req.query)
    RetornaRequisicao(res, retorno)
}

exports.postAcessibilidade = async (req, res) => {
    let retorno = await Servico.InserePadroesAcessibilidade(req.body)
    RetornaRequisicao(res, retorno)
}

exports.putAcessibilidade = async (req, res) => {
    let retorno = await Servico.AtualizaPadroesAcessibilidade(req.body)
    RetornaRequisicao(res, retorno)
}

// Função

exports.getFuncao = async (req, res) => {
    let retorno = await Servico.ListaFuncoes(req.query)
    RetornaRequisicao(res, retorno)
}

exports.postFuncao = async (req, res) => {
    let retorno = await Servico.InsereFuncao(req.body)
    RetornaRequisicao(res, retorno)
}

exports.putFuncao = async (req, res) => {
    let retorno = await Servico.AtualizaFuncao(req.body)
    RetornaRequisicao(res, retorno)
}

// Equipe

exports.getEquipe = async (req, res) => {
    let retorno = await Servico.ListaEquipes(req.query)
    RetornaRequisicao(res, retorno)
}

exports.postEquipe = async (req, res) => {
    let retorno = await Servico.InsereEquipe(req.body)
    RetornaRequisicao(res, retorno)
}

exports.putEquipe = async (req, res) => {
    let retorno = await Servico.AtualizaEquipe(req.body)
    RetornaRequisicao(res, retorno)
}

// Funções internas

const RetornaRequisicao = (res, retorno) => {
    if(retorno.erro) {
        res.json({ MsgErro: retorno.msg })
    }
    res.json(retorno.dados)
}