import { Instruccion } from "../Abstract/instruccion";
import nodoAST from "../Abstract/nodoAST";

export default class Print extends Instruccion
{
    private expresion:Instruccion;

    constructor(expresion:Instruccion, linea:Number, columna:Number){
        super(linea,columna);
        this.expresion = expresion;
    }

    public getNodo() {
        var nodo  = new nodoAST("PRINT");
        nodo.agregarHijo2(this.expresion.getNodo());
        return nodo;
    }

    public traducir():any
    {
        var value = this.expresion.traducir();
        return `imprimir ( ${value} );\n`;
    }
}