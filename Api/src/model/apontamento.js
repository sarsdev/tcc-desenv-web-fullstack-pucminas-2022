const mongoose = require('mongoose')
const Colaborador = require('./usuario')
const Projeto = require('./projeto')

const apontamentoSchema = new mongoose.Schema({
    tipo: {
        type: String,
        enum: ['interno', 'externo']
    },
    colaborador: [Colaborador],
    projeto: [Projeto],
    data_hora_inicial: Date,
    data_hora_final: Date
}, 
{ collection: 'Apontamento' })

exports.SchemaApontamento = apontamentoSchema
exports.ModelApontamento = mongoose.model('Apontamento', apontamentoSchema)