const mongoose = require('mongoose')

const acessibilidadeSchema = new mongoose.Schema({
    usuario: {
        id: mongoose.Types.ObjectId,
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        }
    },
    modo_leitura: {
        type: Boolean
    },
    modo_atalho_unico: {
        type: Boolean
    },
    tema: {
        id: mongoose.Types.ObjectId
    }
}, 
{ collection: 'Acessibilidade' })

exports.SchemaAcessibilidade = acessibilidadeSchema
exports.ModelAcessibilidade = mongoose.model('Acessibilidade', acessibilidadeSchema)