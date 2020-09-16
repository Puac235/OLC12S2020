const express = require('express');
const app = express();

app.get('/', (req, res) => res.send({status: 200, msg:'compi 1 desde Docker.'}));
app.listen(3000, () => console.log('Servidor en el puerto 3000'));