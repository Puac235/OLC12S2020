import { Instruccion } from "../Abstract/instruccion";
import nodoAST from "../Abstract/nodoAST";

export default class Relacional extends Instruccion
{

    private operando1:Instruccion;
    private operando2:Instruccion;
    private operador:String;

    constructor(operando1:Instruccion, operando2:Instruccion, operador:String, fila:Number, columna:Number)
    {
        super(fila,columna);
        this.operador = operador
        this.operando1 = operando1;
        this.operando2 = operando2;
    }

    public getNodo() {
        var nodo  = new nodoAST("RELACIONAL");
        nodo.agregarHijo2(this.operando1.getNodo());
        nodo.agregarHijo(this.operador + "");
        nodo.agregarHijo2(this.operando2.getNodo());
        return nodo;
    }

    public traducir():any
    {
        return this.operando1.traducir() + this.operador + this.operando2.traducir() + "";
    }
}
