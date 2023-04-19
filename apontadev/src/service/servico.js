import axios from 'axios'

// local: http://localhost:3001
// remoto: https://tcc-pucminas-fullstackweb-api.onrender.com
const urlBase = 'https://tcc-pucminas-fullstackweb-api.onrender.com'

const dadosAcessoApp = {
    usuario: 'apontadev@gmail.com',
    senha: 'OxTr32Ug@92!pqKIhsA'
}

const objToken = {
    dataHoraExpira: null,
    token: ''
}

async function GeraToken(dadosForm) {
    let retorno = {
        erro: false,
        msgErro: ''
    }
    if(!(objToken.token !== '' && objToken.dataHoraGeracao > new Date())) {
        try {
            let url = `${urlBase}/token`
            let resposta = await axios.post(url, {
                email: dadosForm.usuario,
                senha: dadosForm.senha
            })
            if(resposta && resposta.data && resposta.data.token) {
                let dataHoraGeracao = new Date()
                objToken.dataHoraExpira = dataHoraGeracao.setMinutes(dataHoraGeracao.getMinutes() + 40)
                objToken.token = `Bearer ${resposta.data.token}`
            } else if(resposta && resposta.data && resposta.data.msg) {
                retorno.erro = true
                retorno.msgErro = resposta.data.msg
            } else {
                retorno.erro = true
                retorno.msgErro = 'Ocorreu um erro inesperado ao buscar o token'
            }         
        } catch (err) {
            retorno.erro = true
            retorno.msgErro = err
        }
    }
    return retorno
}

async function BuscaUsuarioPorEmail(dadosForm) {
    let retorno = {
        erro: false,
        msgErro: '',
        dados: {}
    }
    try {
        let url = `${urlBase}/usuario?email=${dadosForm.usuario}`
        let resposta = await axios.get(url, { headers: {'Authorization': objToken.token} })
        if(resposta && resposta.data && resposta.data.length > 0) {
            retorno.dados = resposta.data[0]
        } else if(resposta && resposta.data && resposta.data.msg) {
            retorno.erro = true
            retorno.msgErro = resposta.data.msg
        } else {
            retorno.erro = true
            retorno.msgErro = 'Ocorreu um erro inesperado ao buscar os dados do usuário'
        }
    } catch (err) {
        retorno.erro = true
        retorno.msgErro = err
    }
    return retorno
}

async function AtualizaUsuario(dados) {
    let retorno = {
        erro: true,
        msgErro: 'Ocorreu um erro ao atualizar a senha!'
    }
    try {
        let url = `${urlBase}/usuario?email=${dados.email}`
        let resposta = await axios.put(url, dados, { headers: {'Authorization': objToken.token} })
        if(resposta && resposta.data && resposta.data.matchedCount > 0) {
            retorno.erro = false
            retorno.msgErro = ''
        } else if(resposta && resposta.data && resposta.data.matchedCount === 0) {
            retorno.msgErro = 'Usuário informado não foi encontrado!'
        }
    } catch (err) {
        retorno.erro = true
        retorno.msgErro = err
    }
    return retorno
}

const Servico = {
    ValidarAcesso: async function(dadosForm) {
        let retorno = {
            erro: true,
            msgErro: 'Ocorreu um erro ao validar os dados!',
            acessoValido: false
        }
        try {
            let respToken = await GeraToken(dadosForm)
            if(respToken.erro) { return respToken }
            let respUsuario = await BuscaUsuarioPorEmail(dadosForm)
            if(respUsuario.erro) { return respUsuario }
            if(respUsuario.dados) {
                let usuario = respUsuario.dados
                if(usuario.situacao !== 'ativo') {
                    retorno.msgErro = 'Usuário inativo. Acesso negado!'
                } else if(usuario.dados_acesso && usuario.dados_acesso.situacao === 'rejeitado') {
                    retorno.msgErro = 'Usuário sem autorização. Acesso negado!'
                } else if(usuario.dados_acesso && usuario.dados_acesso.situacao === 'pendente') {
                    retorno.msgErro = 'Usuário pendente de autorização. Acesso negado!'
                } else if(usuario.dados_acesso && usuario.dados_acesso.situacao === 'aprovado') {
                    retorno.acessoValido = true
                    retorno.erro = false
                    retorno.msgErro = ''
                }
            }
            return retorno
        } catch (err) {
            retorno.msgErro = err
            throw retorno
        }
    },
    DeveCriarSenha: function(dadosModal) {
        return true
    },
    CriarSenha: function(dadosModal) {
        return true
    },
    DefinirNovaSenha: async function(dadosModal) {
        let retorno = {
            erro: true,
            msgErro: 'Ocorreu um erro ao salvar a nova senha!'
        }
        try {
            let respToken = await GeraToken(dadosAcessoApp)
            if(respToken.erro) { return respToken }
            let respUsuario = await BuscaUsuarioPorEmail(dadosModal)
            if(respUsuario.erro) { return respUsuario }
            if(respUsuario.dados) {
                let usuario = respUsuario.dados
                usuario.dados_acesso.senha = dadosModal.senha
                let respAtualizacao = await AtualizaUsuario(usuario)
                if(respAtualizacao.erro) { return respAtualizacao }
                retorno.erro = false
                retorno.msgErro = ''
            }
            return retorno
        } catch (err) {
            retorno.msgErro = err
            throw retorno
        }
    }
}

export default Servico