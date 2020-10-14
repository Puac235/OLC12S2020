  
import { Instruccion } from "../Abstract/instruccion";
import nodoAST from "../Abstract/nodoAST";


export default class Identificador extends Instruccion
{
    private identificador:String;

    constructor(identificador:String, fila:Number, columna:Number)
    {
        super(fila,columna);
        this.identificador = identificador;
    }

    public getNodo() {
        var nodo  = new nodoAST("IDENTIFICADOR");
        nodo.agregarHijo(this.identificador);
        
        return nodo;
    }

    public traducir():any
    {
        return this.identificador;
    }
}