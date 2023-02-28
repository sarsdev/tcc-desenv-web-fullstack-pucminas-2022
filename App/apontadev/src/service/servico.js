import axios from 'axios'

const Servico = {
    ValidarAcesso: async function(dadosForm) {
        return axios.post('http://localhost:3001/usuario/acesso/autenticacao', {
            nome_usuario: dadosForm.usuario,
            senha: dadosForm.senha,
            codigo_google: dadosForm.googleAuth
        })
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