const fs = require('fs');

exports.RetornarTesteInicialApi = new Promise((resolve, reject) => {
    fs.readFile('./docs/api-doc.html', 'utf8', function(err, data){
        if(err){
            reject('Bem vindo ao ApontaDev! Estamos sem a documentação no momento ;(')
            return
        }
        resolve(data)
    })
}).catch(() => 'Bem vindo ao ApontaDev! Estamos sem a documentação no momento ;(')