const mongoose = require('mongoose')
const { SchemaUsuario } = require('./usuario')
const { SchemaTema } = require('./tema')

const acessibilidadeSchema = new mongoose.Schema({
    usuario: SchemaUsuario,
    modo_leitura: {
        type: Boolean
    },
    modo_atalho_unico: {
        type: Boolean
    },
    tema: SchemaTema
}, 
{ collection: 'Acessibilidade' })

exports.SchemaAcessibilidade = acessibilidadeSchema
exports.ModelAcessibilidade = mongoose.model('Acessibilidade', acessibilidadeSchema)