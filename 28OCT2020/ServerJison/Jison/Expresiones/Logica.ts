import { Instruccion } from "../Abstract/instruccion";
import Tipo, {tipos} from "../tablaSimbolos/Tipo";
import Arbol from "../tablaSimbolos/Arbol"; 
import Excepcion from "../Excepciones/Excepcion";
import nodoAST from "../Abstract/nodoAST";
import TablaSimbolos from "../tablaSimbolos/tablaSimbolos";

export default class Logica extends Instruccion
{
    private operando1:Instruccion|undefined;
    private operando2:Instruccion|undefined;
    private operandoU:Instruccion|undefined;
    private operador:OperadorLogico;

    constructor(operador:OperadorLogico, fila:Number, columna:Number,operando1:Instruccion, operando2?:Instruccion)
    {
        super(new Tipo(tipos.BOOLEANO),fila,columna);
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
        var nodo  = new nodoAST("LOGICA");
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

    public ejecutar(tree:Arbol, tabla : TablaSimbolos):any
    {
        var izquierdo = null, derecho = null, unario = null;
        if(this.operandoU == null || this.operandoU == undefined)
        {
            izquierdo = this.operando1?.ejecutar(tree, tabla);
            if (izquierdo instanceof Excepcion) return izquierdo;

            derecho = this.operando2?.ejecutar(tree, tabla);
            if (derecho instanceof Excepcion) return derecho;
        }
        else
        {
            if(this.operando1 != undefined && this.operando2 != undefined)
            {
                unario = this.operandoU?.ejecutar(tree, tabla);
                if (unario instanceof Excepcion) return unario;
            }
            
        }
        if(this.operador == OperadorLogico.AND)
        {
            if ((izquierdo != undefined && izquierdo != null) && (derecho != undefined && derecho != null)) 
            {
                if(this.operando1?.tipo.getTipos() == tipos.BOOLEANO)
                {
                    if(this.operando2?.tipo.getTipos() == tipos.BOOLEANO)//BOOLEAN && BOOLEAN
                    {
                        return izquierdo && derecho;
                    }
                    else
                    {
                        return new Excepcion("Arithmetic Exception", "Operandos erroneos para &&", this.linea, this.columna);
                    }
                }
                else
                {
                    return new Excepcion("Arithmetic Exception", "Operandos erroneos para &&", this.linea, this.columna);
                }
            }
        }
        else if(this.operador == OperadorLogico.OR)
        {
            if ((izquierdo != undefined && izquierdo != null) && (derecho != undefined && derecho != null)) 
            {
                if(this.operando1?.tipo.getTipos() == tipos.BOOLEANO)
                {
                    if(this.operando2?.tipo.getTipos() == tipos.BOOLEANO)//BOOLEAN || BOOLEAN
                    {
                        return izquierdo || derecho;
                    }
                    else
                    {
                        return new Excepcion("Arithmetic Exception", "Operandos erroneos para ||", this.linea, this.columna);
                    }
                }
                else
                {
                    return new Excepcion("Arithmetic Exception", "Operandos erroneos para ||", this.linea, this.columna);
                }
            }
        }
        else if(this.operador == OperadorLogico.NOT)
        {
            if ((unario != undefined && unario != null)) {
                if(this.operandoU?.tipo.getTipos() == tipos.BOOLEANO)
                {
                    return ! unario;
                }
                else
                {
                    return new Excepcion("Arithmetic Exception", "Operandos erroneos para !", this.linea, this.columna);
                }
            }
        }
        else
        {
            return new Excepcion("Arithmetic Exception", "Operandos erroneo.", this.linea, this.columna);
        }
    }
}
export enum OperadorLogico{
    AND,
    OR,
    NOT
}