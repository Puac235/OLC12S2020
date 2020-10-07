var fs = require('fs');
var parser = require('./Jison/gramatica');

function ejecutar(texto)
{
    try
    {
        let traduccion = parser.parse(texto);
        console.log(traduccion);
        fs.writeFile('salida.olc1', traduccion, function(err){
            if(err) throw err;
            console.log('Guardado! :D');
        });
    }catch(err)
    {
        console.log(err);
    }
}

fs.readFile('ejemplo.olc1', 'utf8', function(err, data) {
    console.log(data);
    ejecutar(data);
    console.log('Analisis terminado.')
})
