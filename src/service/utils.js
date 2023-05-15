function TemPermissaoParaAcao(permissao, acao) {
    let temAcao = []
    temAcao = permissao.funcionalidade.selecionados.filter(v => v === acao)
    return temAcao && temAcao.length > 0
}

export const Utils = {
    TemPermissaoNaAplicacao: function(dadosUsuarioLogado, aplicacao) {
        try {
            if(!(dadosUsuarioLogado && dadosUsuarioLogado.permissao && dadosUsuarioLogado.permissao.length > 0)) throw Error()
            let permissoesDaAplicacao = dadosUsuarioLogado.permissao.filter(v => v.tela.titulo === aplicacao)
            return permissoesDaAplicacao && permissoesDaAplicacao.length > 0
        } catch {
            return false
        }
    },
    TemPermissaoNaAcao: function(dadosUsuarioLogado, aplicacao, acao) {
        try {
            if(!(dadosUsuarioLogado && dadosUsuarioLogado.permissao && dadosUsuarioLogado.permissao.length > 0)) throw Error()
            let permissoesDaAplicacao = dadosUsuarioLogado.permissao.filter(v => v.tela.titulo === aplicacao)
            if(permissoesDaAplicacao[0].funcionalidade.todos) return true
            return TemPermissaoParaAcao(permissoesDaAplicacao[0], acao)
        } catch {
            return false
        }
    }
}