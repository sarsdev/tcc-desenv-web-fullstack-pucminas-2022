const mongoose = require('mongoose')

/*
Aplicações:
    - Permissão
    - Acessibilidade
    - Usuário
    - Função
    - Equipe
    - Projeto
    - Agenda
    - Manutenção
    - Simulador
    - Acompanhamento
*/
const aplicacaoSchema = new mongoose.Schema({
    titulo: String,
    funcionalidades: [String]
}, 
{ collection: 'Aplicacao' })

exports.SchemaAplicacao = aplicacaoSchema
exports.ModelAplicacao = mongoose.model('Aplicacao', aplicacaoSchema)