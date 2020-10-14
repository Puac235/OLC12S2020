import { Instruccion } from "../Abstract/instruccion";
import nodoAST from "../Abstract/nodoAST";

export default class Declaracion extends Instruccion
{
    private tipo:String;
    private expresion:Instruccion;
    private identificador:String;


    constructor(tipo:String, identificador:String, expresion:Instruccion, linea:Number, columna:Number){
        super(linea,columna);
        this.tipo = tipo;
        this.identificador = identificador;
        this.expresion = expresion;
    }

    public getNodo() {
        var nodo  = new nodoAST("DECLARACION");
        nodo.agregarHijo(this.tipo);
        nodo.agregarHijo(this.identificador);
        nodo.agregarHijo2(this.expresion.getNodo());
        return nodo;
    }

    public traducir():any
    {
        var value = this.expresion.traducir();
        return `${this.tipo} ${this.identificador} = ${value} ;\n`;
    }
}