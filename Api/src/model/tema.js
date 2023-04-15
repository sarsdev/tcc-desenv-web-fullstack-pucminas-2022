const mongoose = require('mongoose')

/*
Temas: 
    - Dia
    - Noite
    - Frio
    - Quente
    - Marcante
    - Suave
*/
const temaSchema = new mongoose.Schema({
    titulo: String,
    cores: {
        texto: String,
        fundo: String,
        botao: String,
        toolbar: String
    }
}, 
{ collection: 'Tema' })

exports.SchemaTema = temaSchema
exports.ModelTema = mongoose.model('Tema', temaSchema)