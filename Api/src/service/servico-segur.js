const jwt = require('jsonwebtoken')
const ServicoApp = require('./../service/servico-app')

function ValidaToken(req, res, next) {
    const bearerToken = req.headers['authorization']
    if(bearerToken !== undefined) {
        let token = bearerToken.split(' ')[1]
        jwt.verify(token, 'secretkey', (err, auth) => {
            if(err) {
                res.json({ msg: 'Token inválido!' })
            } else {
                next()
            }
        })
    } else {
        res.json({ msg: 'Formato do token inválidos!' })
    }
}

function ValidaDados(req, res, next) {
    let dados = req.body
    if(!(dados.email && dados.senha)) {
        res.json({ msg: 'Os dados enviados não estão no formato correto. Por favor, informar email e senha!' })
    }
    ServicoApp.ListaUsuarios(dados)
        .then(usuario => {
            if(!(!usuario.erro && usuario.dados[0].email === dados.email && usuario.dados[0].dados_acesso.senha === dados.senha)) {
                res.json({ msg: 'Dados de autenticação inválidos!' })
            } else {
                next()
            }
        })
        .catch(erro => res.json({ msg: 'Erro inesperado ao tentar validar os dados!' }))
}

exports.validaToken = ValidaToken
exports.validaDados = ValidaDados