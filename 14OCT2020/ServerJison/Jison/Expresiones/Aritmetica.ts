import { Instruccion } from "../Abstract/instruccion";
import nodoAST from "../Abstract/nodoAST";

export default class Aritmetica extends Instruccion
{
    private operando1:Instruccion|undefined;
    private operando2:Instruccion|undefined;
    private operandoU:Instruccion|undefined;
    private operador:String;

    constructor(operador:String, fila:Number, columna:Number,operando1:Instruccion, operando2?:Instruccion)
    {
        super(fila,columna);
        this.operador = operador
        if(!operando2)
        {
            this.operandoU = operando1;
        }
        else{
            this.operando1 = operando1;
            this.operando2 = operando2;
        }
    }

    public getNodo() {
        var nodo  = new nodoAST("ARITMETICA");
        if(this.operandoU != null)
        {
            nodo.agregarHijo(this.operador + "");
            nodo.agregarHijo2(this.operandoU.getNodo());
        }
        else
        {
            if(this.operando1 != undefined && this.operando2 != undefined)
            {
                nodo.agregarHijo2(this.operando1.getNodo());
                nodo.agregarHijo(this.operador + "");
                nodo.agregarHijo2(this.operando2.getNodo());
            }
            
        } 
        return nodo;
    }

    public traducir():any
    {
        if(this.operandoU != null)
        {
            return `${this.operador} ${this.operandoU.traducir()}`;
        }
        else
        {
            if(this.operando1 != undefined && this.operando2 != undefined)
            {
                return `${this.operando1.traducir()} ${this.operador} ${this.operando2.traducir()}`;
            }
            
        }
        
    }
}
