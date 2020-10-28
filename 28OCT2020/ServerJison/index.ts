import express from 'express';
import cors from 'cors';
import gramaticaRouter from './routes/gramatica.route';

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb', extended: true}));
app.use(cors());

app.use('/jison', gramaticaRouter);

app.get('**',(req:any,res:any)=>{
    res.send("Servidor Jison");
})

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});