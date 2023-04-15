const mongoose = require('mongoose')

const funcaoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    fator_produtividade_esperado: {
        type: Number,
        min: 0.00,
        max: 100.00
    },
    fator_produtividade_real: {
        type: Number,
        min: 0.00,
        max: 100.00
    },
    percentual_estimativa_esperado: {
        type: Number,
        min: 0.00,
        max: 100.00
    },
    percentual_estimativa_real: {
        type: Number,
        min: 0.00,
        max: 100.00
    },
    situacao: {
        type: String,
        required: true,
        enum: ['ativo', 'inativo']
    }
}, 
{ collection: 'Funcao' })

exports.SchemaFuncao = funcaoSchema
exports.ModelFuncao = mongoose.model('Funcao', funcaoSchema)