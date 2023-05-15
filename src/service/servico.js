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

async function BuscaTodasPermissoes() {
    let retorno = {
        erro: false,
        msgErro: '',
        dados: {}
    }
    try {
        let url = `${urlBase}/permissao`
        let resposta = await axios.get(url, { headers: {'Authorization': objToken.token} })
        if(resposta && resposta.data && resposta.data.length > 0) {
            retorno.dados = resposta.data
        } else if(resposta && resposta.data && resposta.data.msg) {
            retorno.erro = true
            retorno.msgErro = resposta.data.msg
        } else {
            retorno.erro = true
            retorno.msgErro = 'Ocorreu um erro inesperado ao buscar os dados das permissões!'
        }
    } catch (err) {
        retorno.erro = true
        retorno.msgErro = err
    }
    return retorno
}

async function BuscaPermissoesPorUsuario(idUsuario) {
    let retorno = {
        erro: false,
        msgErro: '',
        dados: {}
    }
    try {
        let url = `${urlBase}/permissao?idusuario=${idUsuario}`
        let resposta = await axios.get(url, { headers: {'Authorization': objToken.token} })
        if(resposta && resposta.data && resposta.data.length > 0) {
            retorno.dados = resposta.data
        } else if(resposta && resposta.data && resposta.data.msg) {
            retorno.erro = true
            retorno.msgErro = resposta.data.msg
        } else {
            retorno.erro = true
            retorno.msgErro = 'Ocorreu um erro inesperado ao buscar os dados das permissões!'
        }
    } catch (err) {
        retorno.erro = true
        retorno.msgErro = err
    }
    return retorno
}

async function BuscaTodosProjetos() {
    let retorno = {
        erro: false,
        msgErro: '',
        dados: {}
    }
    try {
        let url = `${urlBase}/projeto`
        let resposta = await axios.get(url, { headers: {'Authorization': objToken.token} })
        if(resposta && resposta.data && resposta.data.length > 0) {
            retorno.dados = resposta.data
        } else if(resposta && resposta.data && resposta.data.msg) {
            retorno.erro = true
            retorno.msgErro = resposta.data.msg
        } else {
            retorno.erro = true
            retorno.msgErro = 'Ocorreu um erro inesperado ao buscar os dados dos projetos!'
        }
    } catch (err) {
        retorno.erro = true
        retorno.msgErro = err
    }
    return retorno
}

async function BuscaTodaAgenda(filtro) {
    let retorno = {
        erro: false,
        msgErro: '',
        dados: {}
    }
    try {
        let url = `${urlBase}/agenda?usuarioid=${filtro.usuarioid}`
        let resposta = await axios.get(url, { headers: {'Authorization': objToken.token} })
        if(resposta && resposta.data && resposta.data.length > 0) {
            retorno.dados = resposta.data
        } else if(resposta && resposta.data && resposta.data.msg) {
            retorno.erro = true
            retorno.msgErro = resposta.data.msg
        } else {
            retorno.erro = true
            retorno.msgErro = 'Ocorreu um erro inesperado ao buscar os dados da agenda!'
        }
    } catch (err) {
        retorno.erro = true
        retorno.msgErro = err
    }
    return retorno
}

async function BuscaConfigAgendaPorUsuario(filtro) {
    let retorno = {
        erro: false,
        msgErro: '',
        dados: {}
    }
    try {
        let url = `${urlBase}/config-agenda?usuarioid=${filtro.usuarioid}`
        let resposta = await axios.get(url, { headers: {'Authorization': objToken.token} })
        if(resposta && resposta.data && resposta.data.length > 0) {
            retorno.dados = resposta.data
        } else if(resposta && resposta.data && resposta.data.msg) {
            retorno.erro = true
            retorno.msgErro = resposta.data.msg
        } else {
            retorno.erro = true
            retorno.msgErro = 'Ocorreu um erro inesperado ao buscar os dados de configuração da agenda!'
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

async function AtualizaUsuarioPorId(dados) {
    let retorno = {
        erro: true,
        msgErro: 'Ocorreu um erro ao atualizar o usuário!'
    }
    try {
        let url = `${urlBase}/usuario?id=${dados._id}`
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

async function AtualizaFuncao(dados) {
    let retorno = {
        erro: true,
        msgErro: 'Ocorreu um erro ao atualizar a função!'
    }
    try {
        let url = `${urlBase}/funcao`
        let resposta = await axios.put(url, dados, { headers: {'Authorization': objToken.token} })
        if(resposta && resposta.data && resposta.data.matchedCount > 0) {
            retorno.erro = false
            retorno.msgErro = ''
        } else if(resposta && resposta.data && resposta.data.matchedCount === 0) {
            retorno.msgErro = 'A função não foi encontrada!'
        }
    } catch (err) {
        retorno.erro = true
        retorno.msgErro = err
    }
    return retorno
}

async function AtualizaEquipe(dados) {
    let retorno = {
        erro: true,
        msgErro: 'Ocorreu um erro ao atualizar a equipe!'
    }
    try {
        let url = `${urlBase}/equipe`
        let resposta = await axios.put(url, dados, { headers: {'Authorization': objToken.token} })
        if(resposta && resposta.data && resposta.data.matchedCount > 0) {
            retorno.erro = false
            retorno.msgErro = ''
        } else if(resposta && resposta.data && resposta.data.matchedCount === 0) {
            retorno.msgErro = 'A equipe não foi encontrada!'
        } else if(resposta && resposta.data && resposta.data.MsgErro && resposta.data.MsgErro.reason) {
            retorno.msgErro = resposta.data.MsgErro.reason
        }
    } catch (err) {
        retorno.erro = true
        retorno.msgErro = err
    }
    return retorno
}

async function AtualizaProjeto(dados) {
    let retorno = {
        erro: true,
        msgErro: 'Ocorreu um erro ao atualizar o projeto!'
    }
    try {
        let url = `${urlBase}/projeto`
        let resposta = await axios.put(url, dados, { headers: {'Authorization': objToken.token} })
        if(resposta && resposta.data && resposta.data.matchedCount > 0) {
            retorno.erro = false
            retorno.msgErro = ''
        } else if(resposta && resposta.data && resposta.data.matchedCount === 0) {
            retorno.msgErro = 'O projeto não foi encontrado!'
        } else if(resposta && resposta.data && resposta.data.MsgErro && resposta.data.MsgErro.reason) {
            retorno.msgErro = resposta.data.MsgErro.reason
        }
    } catch (err) {
        retorno.erro = true
        retorno.msgErro = err
    }
    return retorno
}

async function AtualizaConfigAgenda(dados) {
    let retorno = {
        erro: true,
        msgErro: 'Ocorreu um erro ao atualizar a configuração da agenda!'
    }
    try {
        let url = `${urlBase}/config-agenda`
        let resposta = await axios.put(url, dados, { headers: {'Authorization': objToken.token} })
        if(resposta && resposta.data && resposta.data.matchedCount > 0) {
            retorno.erro = false
            retorno.msgErro = ''
        } else if(resposta && resposta.data && resposta.data.matchedCount === 0) {
            retorno.msgErro = 'A configuração do usuário não foi encontrada!'
        } else if(resposta && resposta.data && resposta.data.MsgErro && resposta.data.MsgErro.reason) {
            retorno.msgErro = resposta.data.MsgErro.reason
        }
    } catch (err) {
        retorno.erro = true
        retorno.msgErro = err
    }
    return retorno
}

async function AtualizaAgenda(dados) {
    let retorno = {
        erro: true,
        msgErro: 'Ocorreu um erro ao atualizar a agenda!'
    }
    try {
        let url = `${urlBase}/agenda`
        let resposta = await axios.put(url, dados, { headers: {'Authorization': objToken.token} })
        if(resposta && resposta.data && resposta.data.matchedCount > 0) {
            retorno.erro = false
            retorno.msgErro = ''
        } else if(resposta && resposta.data && resposta.data.matchedCount === 0) {
            retorno.msgErro = 'A agenda não foi encontrada!'
        } else if(resposta && resposta.data && resposta.data.MsgErro && resposta.data.MsgErro.reason) {
            retorno.msgErro = resposta.data.MsgErro.reason
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

async function InserePermissao(dados) {
    let retorno = {
        erro: true,
        msgErro: 'Ocorreu um erro ao inserir a permissão!',
        dados: {}
    }
    try {
        let url = `${urlBase}/permissao`
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

async function InsereFuncao(dados) {
    let retorno = {
        erro: true,
        msgErro: 'Ocorreu um erro ao inserir a função!',
        dados: {}
    }
    try {
        let url = `${urlBase}/funcao`
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

async function InsereEquipe(dados) {
    let retorno = {
        erro: true,
        msgErro: 'Ocorreu um erro ao inserir a equipe!',
        dados: {}
    }
    try {
        let url = `${urlBase}/equipe`
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

async function InsereUsuario(dados) {
    let retorno = {
        erro: true,
        msgErro: 'Ocorreu um erro ao inserir o usuário!',
        dados: {}
    }
    try {
        let url = `${urlBase}/usuario`
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

async function InsereProjeto(dados) {
    let retorno = {
        erro: true,
        msgErro: 'Ocorreu um erro ao inserir o projeto!',
        dados: {}
    }
    try {
        let url = `${urlBase}/projeto`
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

async function RemovePermissao(id) {
    let retorno = {
        erro: true,
        msgErro: 'Ocorreu um erro ao excluir a permissão!',
        dados: {}
    }
    try {
        let url = `${urlBase}/permissao?id=${id}`
        let resposta = await axios.delete(url, { headers: {'Authorization': objToken.token} })
        if(resposta && resposta.data) {
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
                    let respAcess = await ServicoAcessibilidade.RetornaPadraoAcessibilidade(dadosForm)
                    if(respAcess.erro) {                        
                        respUsuario.dados.acessibilidade = {
                            tema: {
                                titulo: 'Dia'
                            },
                            modo_leitura: false,
                            modo_atalho_unico: false
                        }
                    } else {
                        respUsuario.dados.acessibilidade = respAcess.dados
                    }
                    let respPerm = await ServicoPermissao.RetornaPermissaoPorIdUsuario(dadosForm, respUsuario.dados._id)
                    if(respPerm.erro) {                        
                        respUsuario.dados.permissao = []
                    } else {
                        respUsuario.dados.permissao = respPerm.dados
                    }
                    objUsuario = respUsuario.dados
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
    },
    RetornaListaPermissoes: async function(usuarioLogado) {
        let retorno = {
            erro: true,
            msgErro: 'Ocorreu um erro ao buscar as permissões!',
            dados: {}
        }
        try {
            let respToken = await GeraToken(usuarioLogado)
            if(respToken.erro) { return respToken }
            let respPerm = await BuscaTodasPermissoes()
            if(respPerm.erro) { return respPerm }
            retorno.erro = false
            retorno.msgErro = ''
            retorno.dados = respPerm.dados
            return retorno
        } catch (err) {
            retorno.msgErro = err
            throw retorno
        }
    },
    RetornaPermissaoPorIdUsuario: async function(usuarioLogado, idUsuario) {
        let retorno = {
            erro: true,
            msgErro: 'Ocorreu um erro ao buscar a permissão!',
            dados: {}
        }
        try {
            let respToken = await GeraToken(usuarioLogado)
            if(respToken.erro) { return respToken }
            let respPerm = await BuscaPermissoesPorUsuario(idUsuario)
            if(respPerm.erro) { return respPerm }
            retorno.erro = false
            retorno.msgErro = ''
            retorno.dados = respPerm.dados
            return retorno
        } catch (err) {
            retorno.msgErro = err
            throw retorno
        }
    },
    AdicionarPermissao: async function(usuarioLogado, dadosPermissao) {
        let retorno = {
            erro: true,
            msgErro: 'Ocorreu um erro ao adicionar a permissão!',
            dados: {}
        }
        try {
            let respToken = await GeraToken(usuarioLogado)
            if(respToken.erro) { return respToken }
            let respPerm = await InserePermissao(dadosPermissao)
            if(respPerm.erro) { return respPerm }
            retorno.erro = false
            retorno.msgErro = ''
            retorno.dados = respPerm.dados
            return retorno
        } catch (err) {
            retorno.msgErro = err
            throw retorno
        }
    },
    RemoverPermissao: async function(usuarioLogado, id) {
        let retorno = {
            erro: true,
            msgErro: 'Ocorreu um erro ao excluir a permissão!',
            dados: {}
        }
        try {
            let respToken = await GeraToken(usuarioLogado)
            if(respToken.erro) { return respToken }
            let respPerm = await RemovePermissao(id)
            if(respPerm.erro) { return respPerm }
            retorno.erro = false
            retorno.msgErro = ''
            retorno.dados = respPerm.dados
            return retorno
        } catch (err) {
            retorno.msgErro = err
            throw retorno
        }
    }
}

export const ServicoFuncao = {
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
    AtualizaFuncao: async function(usuarioLogado, dadosFunc) {
        let retorno = {
            erro: true,
            msgErro: 'Ocorreu um erro ao atualizar os dados da função!',
            dados: {}
        }
        try {
            let respToken = await GeraToken(usuarioLogado)
            if(respToken.erro) { return respToken }
            let respFuncoes = await AtualizaFuncao(dadosFunc)
            if(respFuncoes.erro) { return respFuncoes }
            retorno.erro = false
            retorno.msgErro = ''
            return retorno
        } catch (err) {
            retorno.msgErro = err
            throw retorno
        }
    },
    InsereFuncao: async function(usuarioLogado, dadosFunc) {
        let retorno = {
            erro: true,
            msgErro: 'Ocorreu um erro ao inserir a função!',
            dados: {}
        }
        try {
            let respToken = await GeraToken(usuarioLogado)
            if(respToken.erro) { return respToken }
            let respFuncoes = await InsereFuncao(dadosFunc)
            if(respFuncoes.erro) { return respFuncoes }
            retorno.erro = false
            retorno.msgErro = ''
            retorno.dados = respFuncoes.dados
            return retorno
        } catch (err) {
            retorno.msgErro = err
            throw retorno
        }
    }
}

export const ServicoEquipe = {
    RetornaListaEquipe: async function(usuarioLogado) {
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
    AtualizaEquipe: async function(usuarioLogado, dadosFunc) {
        let retorno = {
            erro: true,
            msgErro: 'Ocorreu um erro ao atualizar os dados da equipe!',
            dados: {}
        }
        try {
            let respToken = await GeraToken(usuarioLogado)
            if(respToken.erro) { return respToken }
            let respEquipes = await AtualizaEquipe(dadosFunc)
            if(respEquipes.erro) { return respEquipes }
            retorno.erro = false
            retorno.msgErro = ''
            return retorno
        } catch (err) {
            retorno.msgErro = err
            throw retorno
        }
    },
    InsereEquipe: async function(usuarioLogado, dadosFunc) {
        let retorno = {
            erro: true,
            msgErro: 'Ocorreu um erro ao inserir a equipe!',
            dados: {}
        }
        try {
            let respToken = await GeraToken(usuarioLogado)
            if(respToken.erro) { return respToken }
            let respEquipes = await InsereEquipe(dadosFunc)
            if(respEquipes.erro) { return respEquipes }
            retorno.erro = false
            retorno.msgErro = ''
            retorno.dados = respEquipes.dados
            return retorno
        } catch (err) {
            retorno.msgErro = err
            throw retorno
        }
    }
}

export const ServicoUsuario = {
    RetornaListaUsuario: async function(usuarioLogado) {
        let retorno = {
            erro: true,
            msgErro: 'Ocorreu um erro ao buscar os usuários!',
            dados: {}
        }
        try {
            let respToken = await GeraToken(usuarioLogado)
            if(respToken.erro) { return respToken }
            let respUsuario = await BuscaTodosUsuarios()
            if(respUsuario.erro) { return respUsuario }
            retorno.erro = false
            retorno.msgErro = ''
            retorno.dados = respUsuario.dados
            return retorno
        } catch (err) {
            retorno.msgErro = err
            throw retorno
        }
    },
    AtualizaUsuario: async function(usuarioLogado, dadosFunc) {
        let retorno = {
            erro: true,
            msgErro: 'Ocorreu um erro ao atualizar os dados do usuário!',
            dados: {}
        }
        try {
            let respToken = await GeraToken(usuarioLogado)
            if(respToken.erro) { return respToken }
            let respUsuario = await AtualizaUsuarioPorId(dadosFunc)
            if(respUsuario.erro) { return respUsuario }
            retorno.erro = false
            retorno.msgErro = ''
            return retorno
        } catch (err) {
            retorno.msgErro = err
            throw retorno
        }
    },
    InsereUsuario: async function(usuarioLogado, dadosFunc) {
        let retorno = {
            erro: true,
            msgErro: 'Ocorreu um erro ao inserir o usuário!',
            dados: {}
        }
        try {
            let respToken = await GeraToken(usuarioLogado)
            if(respToken.erro) { return respToken }
            let respUsuario = await InsereUsuario(dadosFunc)
            if(respUsuario.erro) { return respUsuario }
            retorno.erro = false
            retorno.msgErro = ''
            retorno.dados = respUsuario.dados
            return retorno
        } catch (err) {
            retorno.msgErro = err
            throw retorno
        }
    }
}

export const ServicoProjeto = {
    RetornaListaProjetos: async function(usuarioLogado) {
        let retorno = {
            erro: true,
            msgErro: 'Ocorreu um erro ao buscar os projetos!',
            dados: {}
        }
        try {
            let respToken = await GeraToken(usuarioLogado)
            if(respToken.erro) { return respToken }
            let respProjeto = await BuscaTodosProjetos()
            if(respProjeto.erro) { return respProjeto }
            retorno.erro = false
            retorno.msgErro = ''
            retorno.dados = respProjeto.dados
            return retorno
        } catch (err) {
            retorno.msgErro = err
            throw retorno
        }
    },
    AtualizaProjeto: async function(usuarioLogado, dadosFunc) {
        let retorno = {
            erro: true,
            msgErro: 'Ocorreu um erro ao atualizar os dados do projeto!',
            dados: {}
        }
        try {
            let respToken = await GeraToken(usuarioLogado)
            if(respToken.erro) { return respToken }
            let respProjeto = await AtualizaProjeto(dadosFunc)
            if(respProjeto.erro) { return respProjeto }
            retorno.erro = false
            retorno.msgErro = ''
            return retorno
        } catch (err) {
            retorno.msgErro = err
            throw retorno
        }
    },
    InsereProjeto: async function(usuarioLogado, dadosFunc) {
        let retorno = {
            erro: true,
            msgErro: 'Ocorreu um erro ao inserir o projeto!',
            dados: {}
        }
        try {
            let respToken = await GeraToken(usuarioLogado)
            if(respToken.erro) { return respToken }
            let respProjeto = await InsereProjeto(dadosFunc)
            if(respProjeto.erro) { return respProjeto }
            retorno.erro = false
            retorno.msgErro = ''
            retorno.dados = respProjeto.dados
            return retorno
        } catch (err) {
            retorno.msgErro = err
            throw retorno
        }
    }
}

export const ServicoAgenda = {
    RetornaListaAgenda: async function(usuarioLogado, filtro) {
        let retorno = {
            erro: true,
            msgErro: 'Ocorreu um erro ao buscar a agenda!',
            dados: {}
        }
        try {
            let respToken = await GeraToken(usuarioLogado)
            if(respToken.erro) { return respToken }
            let respAgenda = await BuscaTodaAgenda(filtro)
            if(respAgenda.erro) { return respAgenda }
            retorno.erro = false
            retorno.msgErro = ''
            retorno.dados = respAgenda.dados
            return retorno
        } catch (err) {
            retorno.msgErro = err
            throw retorno
        }
    },
    AtualizaAgenda: async function(usuarioLogado, dados) {
        let retorno = {
            erro: true,
            msgErro: 'Ocorreu um erro ao atualizar os dados da agenda!',
            dados: {}
        }
        try {
            let respToken = await GeraToken(usuarioLogado)
            if(respToken.erro) { return respToken }
            let respAgenda = await AtualizaAgenda(dados)
            if(respAgenda.erro) { return respAgenda }
            retorno.erro = false
            retorno.msgErro = ''
            return retorno
        } catch (err) {
            retorno.msgErro = err
            throw retorno
        }
    },
    RetornaListaConfigAgenda: async function(usuarioLogado, filtro) {
        let retorno = {
            erro: true,
            msgErro: 'Ocorreu um erro ao buscar as configurações da agenda!',
            dados: {}
        }
        try {
            let respToken = await GeraToken(usuarioLogado)
            if(respToken.erro) { return respToken }
            let respAgenda = await BuscaConfigAgendaPorUsuario(filtro)
            if(respAgenda.erro) { return respAgenda }
            retorno.erro = false
            retorno.msgErro = ''
            retorno.dados = respAgenda.dados
            return retorno
        } catch (err) {
            retorno.msgErro = err
            throw retorno
        }
    },
    AtualizaConfigAgenda: async function(usuarioLogado, dados) {
        let retorno = {
            erro: true,
            msgErro: 'Ocorreu um erro ao atualizar as configurações da agenda!',
            dados: {}
        }
        try {
            let respToken = await GeraToken(usuarioLogado)
            if(respToken.erro) { return respToken }
            let respAgenda = await AtualizaConfigAgenda(dados)
            if(respAgenda.erro) { return respAgenda }
            retorno.erro = false
            retorno.msgErro = ''
            return retorno
        } catch (err) {
            retorno.msgErro = err
            throw retorno
        }
    }
}