const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Compi 1 desde Docker'))
app.listen(3000, () => console.log('Servidor listo'))