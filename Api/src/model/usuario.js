const mongoose = require('mongoose')
const { SchemaFuncao } = require('./funcao')
const { SchemaEquipe } = require('./equipe')

const usuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$'
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
            enum: ['pentende', 'aprovado', 'rejeitado']
        }
    },
    dados_colaborador: {
        cargo: {
            type: String,
            lowercase: true
        },
        funcao: SchemaFuncao,
        equipe: SchemaEquipe,
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