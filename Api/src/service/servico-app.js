const fs = require('fs')
const { ModelUsuario } = require('./../model/usuario')
const { ModelPermissao } = require('./../model/permissao')
const { ModelAcessibilidade } = require('./../model/acessibilidade')
const { ModelFuncao } = require('./../model/funcao')
const { ModelEquipe } = require('./../model/equipe')

// Inicial

exports.RetornarTesteInicialApi = new Promise((resolve, reject) => {
    fs.readFile('./docs/api-doc.html', 'utf8', function(err, data){
        if(err){
            reject('Bem vindo ao ApontaDev! Estamos sem a documentação no momento (')
            return
        }
        resolve(data)
    })
}).catch(() => 'Bem vindo ao ApontaDev! Estamos sem a documentação no momento (')

// Usuário

exports.ListaUsuarios = async () => {
    await ModelUsuario.find()
        .then(info => { return { erro: false, dados: info } })
        .catch(err => { return { erro: true, msg: err } })
}

exports.ListaLogAcessoUsuarios = () => {
    return [
        {
            email: 'usuario@host.com.br',
            nome: 'usuario',
            data_hora_ult_acesso: '01/01/2001 23:59:59',
            situacao_acesso: 'pendente'
        },
        {
            email: 'usuario2@host.com.br',
            nome: 'usuario2',
            data_hora_ult_acesso: '02/01/2001 10:39:01',
            situacao_acesso: 'aprovado'
        }
    ]
}

exports.RetornaAcessoUsuario = (pEmail) => {
    return {
        email: pEmail,
        situacao_acesso: 'aprovado',
        criar_credenciais: true
    }
}

exports.RetornaProjetosUsuario = (pEmail) => {
    return [
        {
            sequencial_projeto: 1001,
            nome_projeto: 'Projeto A',
            codigo_externo: 'Projeto A01',
            descricao: 'Projeto geral para entrega',
            tipo: 'externo',
            nome_cliente: 'Cliente X',
            previsao_conclusao: '31/01/2001 23:59:59',
            inicio_vigencia: '01/01/2001 23:59:59',
            final_vigencia: '31/01/2001 23:59:59',
            horas_estimadas: 150,
            etapa: 'backlog',
            situacao: 'ativo'
        },
        {
            sequencial_projeto: 1002,
            nome_projeto: 'Projeto B',
            codigo_externo: 'Projeto B01',
            descricao: 'Projeto geral para validação',
            tipo: 'interno',
            nome_cliente: 'Cliente Y',
            previsao_conclusao: '31/03/2001 23:59:59',
            inicio_vigencia: '01/01/2001 23:59:59',
            final_vigencia: '31/06/2001 23:59:59',
            horas_estimadas: 250,
            etapa: 'andamento',
            situacao: 'ativo'
        }
    ]
}

exports.UsuarioAutenticado = (pUsuario) => {
    if(pUsuario.nome_usuario == 'admin@gmail.com' 
        && pUsuario.senha == 'admin123'
        && pUsuario.codigo_google == '000000')
    {
        return true
    }
    return false
}

exports.AtualizaLogAcessoUsuario = (pUsuario) => {
    return true
}

exports.AtualizaSenhaUsuario = (pUsuario) => {
    return true
}

exports.AtualizaDadosUsuario = (pUsuario) => {
    return true
}

// Permissão

exports.ListaPermissoes = async () => {
    await ModelPermissao.find()
        .then(info => { return { erro: false, dados: info } })
        .catch(err => { return { erro: true, msg: err } })
}

exports.AtualizaPermissao = (pPermissao) => {
    return true
}

exports.RemovePermissao = (pSeqPermissao) => {
    return true
}

// Acessibilidade

exports.ListaPadroesAcessibilidade = async (pEmailUsuario) => {
    await ModelAcessibilidade.find()
        .then(info => { return { erro: false, dados: info } })
        .catch(err => { return { erro: true, msg: err } })   
}

exports.AtualizaPadroesAcessibilidade = (pPermissao) => {
    return true
}

// Função

exports.ListaFuncoes = async (params) => {    
    let filtro = {}
    let retorno = {}
    if(params.id){
        filtro = { _id: params.id }
    }
    if(params.nome){
        filtro = { ...filtro, nome: { '$regex': params.nome, '$options': 'i' } }
    }
    await ModelFuncao.find(filtro)
        .then(info => { retorno = { erro: false, dados: info } })
        .catch(err => { retorno = { erro: true, msg: err } })
    return retorno
}

exports.InsereFuncao = async (dados) => {
    let retorno = {}
    const funcao = new ModelFuncao(dados)
    await funcao.save()
        .then(info => { retorno = { erro: false, dados: info } })
        .catch(err => { retorno = { erro: true, msg: err} })
    return retorno
}

exports.AtualizaFuncao = async (dados) => {
    let retorno = {}
    if(dados._id) {
        let filtro = { _id: dados._id }
        await ModelFuncao.updateOne(filtro, dados)
            .then(info => { retorno = { erro: false, dados: info } })
            .catch(err => { retorno = { erro: true, msg: err} })
    } else {
        retorno = { erro: true, msg: 'O campo _id do documento não foi informado no body da requisição' }
    }
    return retorno
}

// Equipe

exports.ListaEquipes = async (pParams) => {
    await ModelEquipe.find()
        .then(info => { return { erro: false, dados: info } })
        .catch(err => { return { erro: true, msg: err } })   
}

exports.AtualizaEquipe = (pEquipe) => {
    return true
}

exports.ListaUsuariosEquipe = (pParams) => {
    return [
        {
            email: 'usuario@host.com.br',
            nome: 'usuario',
            cargo: 'desenvolvedor junior',
            funcao: 'desenvolvedor',
            equipe: 'equipe 001',
            fator_produtividade: 1.36,
            situacao: 'ativo'
        },
        {
            email: 'usuario2@gmail.com.br',
            nome: 'usuario',
            cargo: 'desenvolvedor senior',
            funcao: 'desenvolvedor',
            equipe: 'equipe 001',
            fator_produtividade: 1.15,
            situacao: 'ativo'
        }
    ]   
}

exports.AtualizaUsuarioEquipe = (pParams, pUsuarioEquipe) => {
    return true
}

exports.RemoveUsuarioEquipe = (pParams) => {
    return true
}