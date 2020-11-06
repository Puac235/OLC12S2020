import { Instruccion } from "../Abstract/instruccion";
import nodoAST from "../Abstract/nodoAST";

export default class Excepcion extends Instruccion
{
    public recuperado:String;

    constructor(expresion:String, linea:Number, columna:Number){
        super(linea,columna);
        this.recuperado = expresion;
    }

    public getNodo() {
        var nodo  = new nodoAST("Error Sintáctico");
        return nodo;
    }

    public traducir():any
    {
        return ``;
    }
}