const jwt = require('jsonwebtoken')
const ServicoSegur = require('./../service/servico-segur')

// Token

exports.postToken = (req, res) => {
    let dados = req.body
    let dadosAcesso = {
        email: dados.email,
        senha: dados.senha
    }
    jwt.sign(dadosAcesso, 'secretkey', { expiresIn: '1h' }, (err, ptoken) => {
        RetornaRequisicao(res, { erro: false, dados: { token: ptoken } }) 
    })
}

// Funções internas

const RetornaRequisicao = (res, retorno) => {
    if(retorno.erro) {
        res.json({ MsgErro: retorno.msg })
    }
    res.json(retorno.dados)
}

exports.validaToken = ServicoSegur.validaToken
exports.validaDados = ServicoSegur.validaDados