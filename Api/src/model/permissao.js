const mongoose = require('mongoose')
const { SchemaAplicacao } = require('./aplicacao')
const { SchemaFuncao } = require('./funcao')
const { SchemaEquipe } = require('./equipe')

const permissaoSchema = new mongoose.Schema({
    tipo: {
        type: String,
        required: true,
        enum: ['nao_cadastrado', 'cadastrado']
    },
    tela: {
        type: SchemaAplicacao,
        required: true
    },
    funcionalidade: [String],
    equipe: [SchemaEquipe],
    funcao: [SchemaFuncao],
    usuario: [String],
    acesso: {
        type: String,
        required: true,
        enum: ['sim', 'nao']
    }
}, 
{ collection: 'Permissao' })

exports.SchemaPermissao = permissaoSchema
exports.ModelPermissao = mongoose.model('Permissao', permissaoSchema)