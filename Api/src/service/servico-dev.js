const { ModelAplicacao } = require('./../model/aplicacao')
const { ModelTema } = require('./../model/tema')

// Aplicacao

exports.ListaAplicacoes = async (params) => {
    let filtro = {}
    let retorno = {}
    if(params.id){
        filtro = { _id: params.id }
    }
    await ModelAplicacao.find(filtro)
        .then(info => { retorno = { erro: false, dados: info } })
        .catch(err => { retorno = { erro: true, msg: err } })
    return retorno
}

exports.InsereAplicacao = async (dados) => {
    let retorno = {}
    const aplicacao = new ModelAplicacao(dados)
    await aplicacao.save()
        .then(info => { retorno = { erro: false, dados: info } })
        .catch(err => { retorno = { erro: true, msg: err} })
    return retorno
}

exports.AtualizaAplicacao = async (dados) => {
    let retorno = {}
    if(dados._id) {
        let filtro = { _id: dados._id }
        await ModelAplicacao.updateOne(filtro, dados)
            .then(info => { retorno = { erro: false, dados: info } })
            .catch(err => { retorno = { erro: true, msg: err} })
    } else {
        retorno = { erro: true, msg: 'O campo _id do documento não foi informado no body da requisição' }
    }
    return retorno
}

exports.RemoveAplicacao = async (params) => {
    let retorno = {}
    if(params.id) {
        let filtro = { _id: params.id }
        await ModelAplicacao.deleteOne(filtro)
            .then(info => { retorno = { erro: false, dados: info } })
            .catch(err => { retorno = { erro: true, msg: err} })
    } else {
        retorno = { erro: true, msg: 'O parâmetro id do documento não foi informado na requisição' }
    }
    return retorno
}

// Tema

exports.ListaTema = async (params) => {    
    let filtro = {}
    let retorno = {}
    if(params.id){
        filtro = { _id: params.id }
    }
    await ModelTema.find(filtro)
        .then(info => { retorno = { erro: false, dados: info } })
        .catch(err => { retorno = { erro: true, msg: err } })
    return retorno
}

exports.InsereTema = async (dados) => {
    let retorno = {}
    const tema = new ModelTema(dados)
    await tema.save()
        .then(info => { retorno = { erro: false, dados: info } })
        .catch(err => { retorno = { erro: true, msg: err} })
    return retorno
}

exports.AtualizaTema = async (dados) => {
    let retorno = {}
    if(dados._id) {
        let filtro = { _id: dados._id }
        await ModelTema.updateOne(filtro, dados)
            .then(info => { retorno = { erro: false, dados: info } })
            .catch(err => { retorno = { erro: true, msg: err} })
    } else {
        retorno = { erro: true, msg: 'O campo _id do documento não foi informado no body da requisição' }
    }
    return retorno
}

exports.RemoveTema = async (params) => {
    let retorno = {}
    if(params.id) {
        let filtro = { _id: params.id }
        await ModelTema.deleteOne(filtro)
            .then(info => { retorno = { erro: false, dados: info } })
            .catch(err => { retorno = { erro: true, msg: err} })
    } else {
        retorno = { erro: true, msg: 'O parâmetro id do documento não foi informado na requisição' }
    }
    return retorno
}