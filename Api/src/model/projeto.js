const mongoose = require('mongoose')
const Colaborador = require('./usuario')

const projetoSchema = new mongoose.Schema({
    titulo: {
        type: String,        
        required: true,
        trim: true
    },
    codigo_externo: String,
    descricao: String,
    nome_cliente: String,
    tipo: {
        type: String,
        required: true,
        enum: ['Interno', 'Externo']
    },
    previsao_conclusao: Date,
    inicio_projeto: Date,
    final_projeto: Date,
    horas_estimadas: {
        type: Number,
        min: 0.00
    },
    colaboradores: [Colaborador]
}, 
{ collection: 'Projeto' })

exports.SchemaProjeto = projetoSchema
exports.ModelProjeto = mongoose.model('Projeto', projetoSchema)