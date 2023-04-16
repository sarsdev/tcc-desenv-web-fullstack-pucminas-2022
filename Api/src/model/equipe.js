const mongoose = require('mongoose')

const equipeSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    descricao: {
        type: String,
        trim: true
    },
    fator_produtividade_real: {
        type: Number,
        min: 0.00,
        max: 100.00
    },
    situacao: {
        type: String,
        required: true,
        enum: ['ativo', 'inativo']
    },
    integrantes: [{
        id: mongoose.Types.ObjectId,
        nome: String,
        cargo: String,
        funcao: {
            id: mongoose.Types.ObjectId,
            nome: String
        }
    }]
}, 
{ collection: 'Equipe' })

exports.SchemaEquipe = equipeSchema
exports.ModelEquipe = mongoose.model('Equipe', equipeSchema)