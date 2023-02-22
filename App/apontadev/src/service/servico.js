const dadosAcesso = {
    usuario: 'admin@gmail.com',
    senha: '123456',
    googleAuth: '000000'
}

const Servico = {
    ValidarAcesso: function(dadosForm) {
        console.log(`ValidarAcesso: ${dadosForm}`)
        return dadosAcesso.usuario === dadosForm.usuario
            && dadosAcesso.senha === dadosForm.senha
            && dadosAcesso.googleAuth === dadosForm.googleAuth
    },
    DeveCriarSenha: function(dadosModal) {
        return true
    },
    CriarSenha: function(dadosModal) {
        return true
    },
    DefinirNovaSenha: function(dadosModal) {
        return true
    }
}

export default Servico