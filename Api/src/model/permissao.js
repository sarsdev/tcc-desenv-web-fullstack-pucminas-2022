const mongoose = require('mongoose')

const permissaoSchema = new mongoose.Schema({
    tipo: {
        type: String,
        required: true,
        enum: ['nao_cadastrado', 'cadastrado']
    },
    tela: {
        id: mongoose.Types.ObjectId,
        titulo: String
    },
    funcionalidade: {
        todos: Boolean,
        selecionados: [String]
    },
    equipe: {
        todos: Boolean,
        selecionados: [
            {
                id: mongoose.Types.ObjectId,
                nome: String
            }
        ]
    },
    funcao: {
        todos: Boolean,
        selecionados: [
            {
                id: mongoose.Types.ObjectId,
                nome: String
            }
        ]
    },
    usuario: {
        todos: Boolean,
        selecionados: [
            {
                id: mongoose.Types.ObjectId,
                nome: String
            }
        ]
    },
    acesso: {
        type: String,
        required: true,
        enum: ['sim', 'nao']
    }
}, 
{ collection: 'Permissao' })

exports.SchemaPermissao = permissaoSchema
exports.ModelPermissao = mongoose.model('Permissao', permissaoSchema)