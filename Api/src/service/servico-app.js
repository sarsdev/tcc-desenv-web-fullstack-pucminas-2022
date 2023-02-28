const fs = require('fs');

exports.RetornarTesteInicialApi = new Promise((resolve, reject) => {
    fs.readFile('./docs/api-doc.html', 'utf8', function(err, data){
        if(err){
            reject('Bem vindo ao ApontaDev! Estamos sem a documentação no momento ;(')
            return
        }
        resolve(data)
    })
}).catch(() => 'Bem vindo ao ApontaDev! Estamos sem a documentação no momento ;(')

exports.ListaUsuarios = () => {
    return [
        {
            email: "usuario@host.com.br",
            nome: "usuario",
            cargo: "desenvolvedor junior",
            funcao: "desenvolvedor",
            equipe: "equipe 001",
            fator_produtividade: 1.36,
            situacao: "ativo"
        },
        {
            email: "usuario2@host.com.br",
            nome: "usuario2",
            cargo: "desenvolvedor pleno",
            funcao: "desenvolvedor",
            equipe: "equipe 001",
            fator_produtividade: 0.36,
            situacao: "inativo"
        }
    ]
}

exports.ListaLogAcessoUsuarios = () => {
    return [
        {
            email: "usuario@host.com.br",
            nome: "usuario",
            data_hora_ult_acesso: "01/01/2001 23:59:59",
            situacao_acesso: "pendente"
        },
        {
            email: "usuario2@host.com.br",
            nome: "usuario2",
            data_hora_ult_acesso: "02/01/2001 10:39:01",
            situacao_acesso: "aprovado"
        }
    ]
}

exports.RetornaAcessoUsuario = (pEmail) => {
    return {
        email: pEmail,
        situacao_acesso: "aprovado",
        criar_credenciais: true
    }
}

exports.RetornaProjetosUsuario = (pEmail) => {
    return [
        {
            sequencial_projeto: 1001,
            nome_projeto: "Projeto A",
            codigo_externo: "Projeto A01",
            descricao: "Projeto geral para entrega",
            tipo: "externo",
            nome_cliente: "Cliente X",
            previsao_conclusao: "31/01/2001 23:59:59",
            inicio_vigencia: "01/01/2001 23:59:59",
            final_vigencia: "31/01/2001 23:59:59",
            horas_estimadas: 150,
            etapa: "backlog",
            situacao: "ativo"
        },
        {
            sequencial_projeto: 1002,
            nome_projeto: "Projeto B",
            codigo_externo: "Projeto B01",
            descricao: "Projeto geral para validação",
            tipo: "interno",
            nome_cliente: "Cliente Y",
            previsao_conclusao: "31/03/2001 23:59:59",
            inicio_vigencia: "01/01/2001 23:59:59",
            final_vigencia: "31/06/2001 23:59:59",
            horas_estimadas: 250,
            etapa: "andamento",
            situacao: "ativo"
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