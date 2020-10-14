  
import { Instruccion } from "../Abstract/instruccion";
import nodoAST from "../Abstract/nodoAST";


export default class Primitivo extends Instruccion
{
    private valor:String;

    constructor(valor:String, fila:Number, columna:Number)
    {
        super(fila,columna);
        this.valor = valor;
    }
    public getNodo() {
        var nodo  = new nodoAST("PRIMITIVO");
        if(this.valor[0] == '"' || this.valor[0]=="'")
        {
            nodo.agregarHijo(this.valor.substr(1,this.valor.length-2));
        }
        else
        {
            nodo.agregarHijo(this.valor);
        }
        
        return nodo;
    }

    public traducir():any
    {
        return this.valor;
    }
}