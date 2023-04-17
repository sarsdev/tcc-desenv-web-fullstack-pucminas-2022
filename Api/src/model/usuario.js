const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    situacao: {
        type: String,
        required: true,
        enum: ['ativo', 'inativo']
    },
    dados_pessoais: {
        cpf: {
            type: String
        },
        nome: {
            type: String,
            lowercase: true,
            trim: true
        }
    },
    dados_acesso: {
        senha: {
            type: String,
            trim: true
        },
        data_ultimo_acesso: {
            type: Date
        },
        ind_acesso_temporario: {
            type: Boolean
        },
        situacao: {
            type: String,
            enum: ['pendente', 'aprovado', 'rejeitado']
        }
    },
    dados_colaborador: {
        cargo: {
            type: String,
            lowercase: true
        },
        funcao: {
            id: mongoose.Types.ObjectId,
            nome: String
        },
        equipe: {
            id: mongoose.Types.ObjectId,
            nome: String
        },
        fator_produtividade: {
            type: Number,
            min: 0.00,
            max: 100.00
        }
    }
}, 
{ collection: 'Usuario' })

exports.SchemaUsuario = usuarioSchema
exports.ModelUsuario = mongoose.model('Usuario', usuarioSchema)