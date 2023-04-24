import axios from 'axios'

/* CONSTANTES E FUNÇÕES INTERNAS */

let objUsuario = {}

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
    if(!(objToken.token !== '' && objToken.dataHoraExpira > new Date())) {
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
            objUsuario = resposta.data[0]
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

async function BuscaTemas() {
    let retorno = {
        erro: false,
        msgErro: '',
        dados: {}
    }
    try {
        let url = `${urlBase}/dev/tema`
        let resposta = await axios.get(url, { headers: {'Authorization': objToken.token} })
        if(resposta && resposta.data && resposta.data.length > 0) {
            retorno.dados = resposta.data
        } else if(resposta && resposta.data && resposta.data.msg) {
            retorno.erro = true
            retorno.msgErro = resposta.data.msg
        } else {
            retorno.erro = true
            retorno.msgErro = 'Ocorreu um erro inesperado ao buscar os dados de temas!'
        }
    } catch (err) {
        retorno.erro = true
        retorno.msgErro = err
    }
    return retorno
}

async function BuscaPadraoAcessibilidade(usuario) {
    let retorno = {
        erro: false,
        msgErro: '',
        dados: {}
    }
    try {
        let url = `${urlBase}/acessibilidade?email=${usuario.usuario}`
        let resposta = await axios.get(url, { headers: {'Authorization': objToken.token} })
        if(resposta && resposta.data && resposta.data.length > 0) {
            retorno.dados = resposta.data[0]
        } else if(resposta && resposta.data && resposta.data.msg) {
            retorno.erro = true
            retorno.msgErro = resposta.data.msg
        } else {
            retorno.erro = true
            retorno.msgErro = 'Ocorreu um erro inesperado ao buscar os dados de acessibilidade!'
        }
    } catch (err) {
        retorno.erro = true
        retorno.msgErro = err
    }
    return retorno
}

async function BuscaTodasEquipes() {
    let retorno = {
        erro: false,
        msgErro: '',
        dados: {}
    }
    try {
        let url = `${urlBase}/equipe`
        let resposta = await axios.get(url, { headers: {'Authorization': objToken.token} })
        if(resposta && resposta.data && resposta.data.length > 0) {
            retorno.dados = resposta.data
        } else if(resposta && resposta.data && resposta.data.msg) {
            retorno.erro = true
            retorno.msgErro = resposta.data.msg
        } else {
            retorno.erro = true
            retorno.msgErro = 'Ocorreu um erro inesperado ao buscar os dados de equipes!'
        }
    } catch (err) {
        retorno.erro = true
        retorno.msgErro = err
    }
    return retorno
}

async function BuscaTodasFuncoes() {
    let retorno = {
        erro: false,
        msgErro: '',
        dados: {}
    }
    try {
        let url = `${urlBase}/funcao`
        let resposta = await axios.get(url, { headers: {'Authorization': objToken.token} })
        if(resposta && resposta.data && resposta.data.length > 0) {
            retorno.dados = resposta.data
        } else if(resposta && resposta.data && resposta.data.msg) {
            retorno.erro = true
            retorno.msgErro = resposta.data.msg
        } else {
            retorno.erro = true
            retorno.msgErro = 'Ocorreu um erro inesperado ao buscar os dados de funções!'
        }
    } catch (err) {
        retorno.erro = true
        retorno.msgErro = err
    }
    return retorno
}

async function BuscaTodosUsuarios() {
    let retorno = {
        erro: false,
        msgErro: '',
        dados: {}
    }
    try {
        let url = `${urlBase}/usuario`
        let resposta = await axios.get(url, { headers: {'Authorization': objToken.token} })
        if(resposta && resposta.data && resposta.data.length > 0) {
            retorno.dados = resposta.data
        } else if(resposta && resposta.data && resposta.data.msg) {
            retorno.erro = true
            retorno.msgErro = resposta.data.msg
        } else {
            retorno.erro = true
            retorno.msgErro = 'Ocorreu um erro inesperado ao buscar os dados de usuários!'
        }
    } catch (err) {
        retorno.erro = true
        retorno.msgErro = err
    }
    return retorno
}

async function BuscaTodasAplicacoes() {
    let retorno = {
        erro: false,
        msgErro: '',
        dados: {}
    }
    try {
        let url = `${urlBase}/dev/aplicacao`
        let resposta = await axios.get(url, { headers: {'Authorization': objToken.token} })
        if(resposta && resposta.data && resposta.data.length > 0) {
            retorno.dados = resposta.data
        } else if(resposta && resposta.data && resposta.data.msg) {
            retorno.erro = true
            retorno.msgErro = resposta.data.msg
        } else {
            retorno.erro = true
            retorno.msgErro = 'Ocorreu um erro inesperado ao buscar os dados das aplicações!'
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

async function AtualizaPadrao(dados) {
    let retorno = {
        erro: true,
        msgErro: 'Ocorreu um erro ao atualizar as definições de acessibilidade!'
    }
    try {
        let url = `${urlBase}/acessibilidade`
        let resposta = await axios.put(url, dados, { headers: {'Authorization': objToken.token} })
        if(resposta && resposta.data && resposta.data.matchedCount > 0) {
            retorno.erro = false
            retorno.msgErro = ''
        } else if(resposta && resposta.data && resposta.data.matchedCount === 0) {
            retorno.msgErro = 'Padrão de acessibilidade não foi encontrado!'
        }
    } catch (err) {
        retorno.erro = true
        retorno.msgErro = err
    }
    return retorno
}

async function InserePadrao(dados) {
    let retorno = {
        erro: true,
        msgErro: 'Ocorreu um erro ao inserir as definições de acessibilidade!',
        dados: {}
    }
    try {
        let url = `${urlBase}/acessibilidade`
        let resposta = await axios.post(url, dados, { headers: {'Authorization': objToken.token} })
        if(resposta && resposta.data && resposta.data._id) {
            retorno.erro = false
            retorno.msgErro = ''
            retorno.dados = resposta.data
        }
    } catch (err) {
        retorno.erro = true
        retorno.msgErro = err
    }
    return retorno
}

/* SERVIÇOS EXPOSTOS PARA AS TELAS */

export const ServicoLogin = {
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
    },
    RetornaDadosUsuario: function() {
        if(objUsuario) {
            return {
                erro: false,
                msgErro: '',
                dados: objUsuario
            }
        } else {
            return {
                erro: true,
                msgErro: 'Não há dados do usuário carregados!',
                dados: {}
            }
        }
    }
}

export const ServicoAcessibilidade = {
    RetornaListaTemas: async function(usuarioLogado) {
        let retorno = {
            erro: true,
            msgErro: 'Ocorreu um erro ao buscar os temas!',
            dados: {}
        }
        try {
            let respToken = await GeraToken(usuarioLogado)
            if(respToken.erro) { return respToken }
            let respTemas = await BuscaTemas()
            if(respTemas.erro) { return respTemas }
            retorno.erro = false
            retorno.msgErro = ''
            retorno.dados = respTemas.dados
            return retorno
        } catch (err) {
            retorno.msgErro = err
            throw retorno
        }
    },
    RetornaPadraoAcessibilidade: async function(usuarioLogado) {
        let retorno = {
            erro: true,
            msgErro: 'Ocorreu um erro ao buscar as configurações de acessibilidade!',
            dados: {}
        }
        try {
            let respToken = await GeraToken(usuarioLogado)
            if(respToken.erro) { return respToken }
            let respAcessibilidade = await BuscaPadraoAcessibilidade(usuarioLogado)
            if(respAcessibilidade.erro) { return respAcessibilidade }
            retorno.erro = false
            retorno.msgErro = ''
            retorno.dados = respAcessibilidade.dados
            return retorno
        } catch (err) {
            retorno.msgErro = err
            throw retorno
        }
    },
    InserePadrao: async function(usuarioLogado, dados) {
        let retorno = {
            erro: true,
            msgErro: 'Ocorreu um erro ao inserir as configurações de acessibilidade!',
            dados: {}
        }
        try {
            let respToken = await GeraToken(usuarioLogado)
            if(respToken.erro) { return respToken }
            let respAcessibilidade = await InserePadrao(dados)
            if(respAcessibilidade.erro) { return respAcessibilidade }
            retorno.erro = false
            retorno.msgErro = ''
            retorno.dados = respAcessibilidade.dados
            return retorno
        } catch (err) {
            retorno.msgErro = err
            throw retorno
        }
    },
    AtualizaPadrao: async function(usuarioLogado, dados) {
        let retorno = {
            erro: true,
            msgErro: 'Ocorreu um erro ao atualizar as configurações de acessibilidade!',
            dados: {}
        }
        try {
            let respToken = await GeraToken(usuarioLogado)
            if(respToken.erro) { return respToken }
            let respAcessibilidade = await AtualizaPadrao(dados)
            if(respAcessibilidade.erro) { return respAcessibilidade }
            retorno.erro = false
            retorno.msgErro = ''
            return retorno
        } catch (err) {
            retorno.msgErro = err
            throw retorno
        }
    }
}

export const ServicoPermissao = {
    RetornaListaEquipes: async function(usuarioLogado) {
        let retorno = {
            erro: true,
            msgErro: 'Ocorreu um erro ao buscar as equipes!',
            dados: {}
        }
        try {
            let respToken = await GeraToken(usuarioLogado)
            if(respToken.erro) { return respToken }
            let respEquipes = await BuscaTodasEquipes()
            if(respEquipes.erro) { return respEquipes }
            retorno.erro = false
            retorno.msgErro = ''
            retorno.dados = respEquipes.dados
            return retorno
        } catch (err) {
            retorno.msgErro = err
            throw retorno
        }
    },
    RetornaListaFuncoes: async function(usuarioLogado) {
        let retorno = {
            erro: true,
            msgErro: 'Ocorreu um erro ao buscar as funções!',
            dados: {}
        }
        try {
            let respToken = await GeraToken(usuarioLogado)
            if(respToken.erro) { return respToken }
            let respFuncoes = await BuscaTodasFuncoes()
            if(respFuncoes.erro) { return respFuncoes }
            retorno.erro = false
            retorno.msgErro = ''
            retorno.dados = respFuncoes.dados
            return retorno
        } catch (err) {
            retorno.msgErro = err
            throw retorno
        }
    },
    RetornaListaUsuarios: async function(usuarioLogado) {
        let retorno = {
            erro: true,
            msgErro: 'Ocorreu um erro ao buscar os usuários!',
            dados: {}
        }
        try {
            let respToken = await GeraToken(usuarioLogado)
            if(respToken.erro) { return respToken }
            let respUsuarios = await BuscaTodosUsuarios()
            if(respUsuarios.erro) { return respUsuarios }
            retorno.erro = false
            retorno.msgErro = ''
            retorno.dados = respUsuarios.dados
            return retorno
        } catch (err) {
            retorno.msgErro = err
            throw retorno
        }
    },
    RetornaListaAplicacoes: async function(usuarioLogado) {
        let retorno = {
            erro: true,
            msgErro: 'Ocorreu um erro ao buscar as aplicações!',
            dados: {}
        }
        try {
            let respToken = await GeraToken(usuarioLogado)
            if(respToken.erro) { return respToken }
            let respAplic = await BuscaTodasAplicacoes()
            if(respAplic.erro) { return respAplic }
            retorno.erro = false
            retorno.msgErro = ''
            retorno.dados = respAplic.dados
            return retorno
        } catch (err) {
            retorno.msgErro = err
            throw retorno
        }
    }
}