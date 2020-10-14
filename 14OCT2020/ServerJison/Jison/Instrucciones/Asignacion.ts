import { Instruccion } from "../Abstract/instruccion";
import nodoAST from "../Abstract/nodoAST";

export default class Declaracion extends Instruccion
{
    private expresion:Instruccion;
    private identificador:String;


    constructor(identificador:String, expresion:Instruccion, linea:Number, columna:Number){
        super(linea,columna);
        this.identificador = identificador;
        this.expresion = expresion;
    }

    public getNodo() {
        var nodo  = new nodoAST("ASIGNACION");
        nodo.agregarHijo(this.identificador);
        nodo.agregarHijo2(this.expresion.getNodo());
        return nodo;
    }

    public traducir():any
    {
        var value = this.expresion.traducir();
        return `${this.identificador} = ${value} ;\n`;
    }
}