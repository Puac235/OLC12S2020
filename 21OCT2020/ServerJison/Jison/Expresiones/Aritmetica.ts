import { Instruccion } from "../Abstract/instruccion";
import Tipo, {tipos} from "../tablaSimbolos/Tipo";
import Arbol from "../tablaSimbolos/Arbol";
import Excepcion from "../Excepciones/Excepcion";
import nodoAST from "../Abstract/nodoAST";

export default class Aritmetica extends Instruccion
{
    private operando1:Instruccion|undefined;
    private operando2:Instruccion|undefined;
    private operandoU:Instruccion|undefined;
    private operador:OperadorAritmetico;

    constructor(operador:OperadorAritmetico, fila:Number, columna:Number,operando1:Instruccion, operando2?:Instruccion)
    {
        super(new Tipo(tipos.ENTERO),fila,columna);
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
            nodo.agregarHijo("-");
            nodo.agregarHijo2(this.operandoU.getNodo());
        }
        else
        {
            if(this.operando1 != undefined && this.operando2 != undefined)
            {
                nodo.agregarHijo2(this.operando1.getNodo());
                if(this.operador == 0) nodo.agregarHijo("+");
                if(this.operador == 1) nodo.agregarHijo("-");
                if(this.operador == 2) nodo.agregarHijo("*");
                if(this.operador == 3) nodo.agregarHijo("/");
                nodo.agregarHijo2(this.operando2.getNodo());
            }
            
        } 
        return nodo;
    }

    public ejecutar(tree:Arbol):any
    {
        var izquierdo = null, derecho = null, unario = null;
        if(this.operandoU == null || this.operandoU == undefined)
        {
            izquierdo = this.operando1?.ejecutar(tree);
            if (izquierdo instanceof Excepcion) return izquierdo;

            derecho = this.operando2?.ejecutar(tree);
            if (derecho instanceof Excepcion) return derecho;
        }
        else
        {
            unario = this.operandoU?.ejecutar(tree);
            if (unario instanceof Excepcion) return unario;
            
        }

        if(this.operador == OperadorAritmetico.SUMA)
        {
            if ((izquierdo != undefined && izquierdo != null) && (derecho != undefined && derecho != null)) {
                if(this.operando1?.tipo.getTipos() == tipos.ENTERO)
                {
                    if(this.operando2?.tipo.getTipos() == tipos.ENTERO)//INTEGER+INTEGER
                    {
                        this.tipo = new Tipo(tipos.ENTERO);
                        return Number(izquierdo) + Number(derecho);
                    }
                    else if(this.operando2?.tipo.getTipos() == tipos.DECIMAL)//INTEGER+DOUBLE
                    {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return Number(izquierdo) + Number(derecho);
                    }
                    else if(this.operando2?.tipo.getTipos() == tipos.CARACTER)//INTEGER+CHAR
                    {
                        this.tipo = new Tipo(tipos.ENTERO);
                        return Number(izquierdo) + derecho.charCodeAt(0);
                    }
                    else if(this.operando2?.tipo.getTipos() == tipos.CADENA)//INTEGER+STRING
                    {
                        this.tipo = new Tipo(tipos.CADENA);
                        return izquierdo + derecho;
                    }
                    else
                    {
                        return new Excepcion("Arithmetic Exception", "Operandos erroneos para +", this.linea, this.columna);
                    }
                }
                else if(this.operando1?.tipo.getTipos() == tipos.DECIMAL)
                {
                    if(this.operando2?.tipo.getTipos() == tipos.ENTERO)//DOUBLE+INTEGER
                    {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return Number(izquierdo) + Number(derecho);
                    }
                    else if(this.operando2?.tipo.getTipos() == tipos.DECIMAL)//DOUBLE+DOUBLE
                    {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return Number(izquierdo) + Number(derecho);
                    }
                    else if(this.operando2?.tipo.getTipos() == tipos.CARACTER)//DOUBLE+CHAR
                    {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return Number(izquierdo) + derecho.charCodeAt(0);
                    }
                    else if(this.operando2?.tipo.getTipos() == tipos.CADENA)//DOUBLE+STRING
                    {
                        this.tipo = new Tipo(tipos.CADENA);
                        return izquierdo + derecho;
                    }
                    else
                    {
                        return new Excepcion("Arithmetic Exception", "Operandos erroneos para +", this.linea, this.columna);
                    }
                }
                else if(this.operando1?.tipo.getTipos() == tipos.CARACTER)
                {
                    if(this.operando2?.tipo.getTipos() == tipos.ENTERO)//CHAR+INTEGER
                    {
                        this.tipo = new Tipo(tipos.ENTERO);
                        return izquierdo.charCodeAt(0) + Number(derecho);
                    }
                    else if(this.operando2?.tipo.getTipos() == tipos.DECIMAL)//CHAR+DOUBLE
                    {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return izquierdo.charCodeAt(0) + Number(derecho);
                    }
                    else if(this.operando2?.tipo.getTipos() == tipos.CARACTER)//CHAR+CHAR
                    {
                        this.tipo = new Tipo(tipos.CADENA);
                        return izquierdo + derecho;
                    }
                    else if(this.operando2?.tipo.getTipos() == tipos.CADENA)//CHAR+STRING
                    {
                        this.tipo = new Tipo(tipos.CADENA);
                        return izquierdo + derecho;
                    }
                    else
                    {
                        return new Excepcion("Arithmetic Exception", "Operandos erroneos para +", this.linea, this.columna);
                    }
                }
                else if(this.operando1?.tipo.getTipos() == tipos.CADENA)
                {
                    if(this.operando2?.tipo.getTipos() == tipos.ENTERO)//STRING+INTEGER
                    {
                        this.tipo = new Tipo(tipos.CADENA);
                        return izquierdo + derecho;
                    }
                    else if(this.operando2?.tipo.getTipos() == tipos.DECIMAL)//STRING+DOUBLE
                    {
                        this.tipo = new Tipo(tipos.CADENA);
                        return izquierdo + derecho;
                    }
                    else if(this.operando2?.tipo.getTipos() == tipos.CARACTER)//STRING+CHAR
                    {
                        this.tipo = new Tipo(tipos.CADENA);
                        return izquierdo + derecho;
                    }
                    else if(this.operando2?.tipo.getTipos() == tipos.BOOLEANO)//STRING+STRING
                    {
                        this.tipo = new Tipo(tipos.CADENA);
                        return izquierdo + derecho;
                    }
                    else if(this.operando2?.tipo.getTipos() == tipos.CADENA)//STRING+STRING
                    {
                        this.tipo = new Tipo(tipos.CADENA);
                        return izquierdo + derecho;
                    }
                    else
                    {
                        return new Excepcion("Arithmetic Exception", "Operandos erroneos para +", this.linea, this.columna);
                    }
                }
                else if(this.operando1?.tipo.getTipos() == tipos.BOOLEANO)
                {
                    if(this.operando2?.tipo.getTipos() == tipos.CADENA)//BOOLEAN+STRING
                    {
                        this.tipo = new Tipo(tipos.CADENA);
                        return izquierdo + derecho;
                    }
                    else
                    {
                        return new Excepcion("Arithmetic Exception", "Operandos erroneos para +", this.linea, this.columna);
                    }
                }
                else
                {
                    return new Excepcion("Arithmetic Exception", "Operandos erroneos para +", this.linea, this.columna);
                }
            }
        }
        else if(this.operador == OperadorAritmetico.RESTA)
        {
            if ((izquierdo != undefined && izquierdo != null) && (derecho != undefined && derecho != null)) {
                if(this.operando1?.tipo.getTipos() == tipos.ENTERO)
                {
                    if(this.operando2?.tipo.getTipos() == tipos.ENTERO)//INTEGER-INTEGER
                    {
                        this.tipo = new Tipo(tipos.ENTERO);
                        return Number(izquierdo) - Number(derecho);
                    }
                    else if(this.operando2?.tipo.getTipos() == tipos.DECIMAL)//INTEGER-DOUBLE
                    {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return Number(izquierdo) - Number(derecho);
                    }
                    else if(this.operando2?.tipo.getTipos() == tipos.CARACTER)//INTEGER-CHAR
                    {
                        this.tipo = new Tipo(tipos.ENTERO);
                        return Number(izquierdo) - derecho.charCodeAt(0);
                    }
                    else
                    {
                        return new Excepcion("Arithmetic Exception", "Operandos erroneos para -", this.linea, this.columna);
                    }
                }
                else if(this.operando1?.tipo.getTipos() == tipos.DECIMAL)
                {
                    if(this.operando2?.tipo.getTipos() == tipos.ENTERO)//DOUBLE-INTEGER
                    {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return Number(izquierdo) - Number(derecho);
                    }
                    else if(this.operando2?.tipo.getTipos() == tipos.DECIMAL)//DOUBLE-DOUBLE
                    {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return Number(izquierdo) - Number(derecho);
                    }
                    else if(this.operando2?.tipo.getTipos() == tipos.CARACTER)//DOUBLE-CHAR
                    {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return Number(izquierdo) - derecho.charCodeAt(0);
                    }
                    else
                    {
                        return new Excepcion("Arithmetic Exception", "Operandos erroneos para -", this.linea, this.columna);
                    }
                }
                else if(this.operando1?.tipo.getTipos() == tipos.CARACTER)
                {
                    if(this.operando2?.tipo.getTipos() == tipos.ENTERO)//CHAR-INTEGER
                    {
                        this.tipo = new Tipo(tipos.ENTERO);
                        return izquierdo.charCodeAt(0) - Number(derecho);
                    }
                    else if(this.operando2?.tipo.getTipos() == tipos.DECIMAL)//CHAR-DOUBLE
                    {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return izquierdo.charCodeAt(0) - Number(derecho);
                    }
                    else if(this.operando2?.tipo.getTipos() == tipos.CARACTER)//CHAR-CHAR
                    {
                        this.tipo = new Tipo(tipos.ENTERO);
                        return izquierdo.charCodeAt(0) - derecho.charCodeAt(0);
                    }
                    else
                    {
                        return new Excepcion("Arithmetic Exception", "Operandos erroneos para -", this.linea, this.columna);
                    }
                }
                else
                {
                    return new Excepcion("Arithmetic Exception", "Operandos erroneos para -", this.linea, this.columna);
                }
            }
        }
        else if(this.operador == OperadorAritmetico.MULTIPLICACION)
        {
            if ((izquierdo != undefined && izquierdo != null) && (derecho != undefined && derecho != null)) {
                if(this.operando1?.tipo.getTipos() == tipos.ENTERO)
                {
                    if(this.operando2?.tipo.getTipos() == tipos.ENTERO)//INTEGER*INTEGER
                    {
                        this.tipo = new Tipo(tipos.ENTERO);
                        return Number(izquierdo) * Number(derecho);
                    }
                    else if(this.operando2?.tipo.getTipos() == tipos.DECIMAL)//INTEGER*DOUBLE
                    {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return Number(izquierdo) * Number(derecho);
                    }
                    else if(this.operando2?.tipo.getTipos() == tipos.CARACTER)//INTEGER*CHAR
                    {
                        this.tipo = new Tipo(tipos.ENTERO);
                        return Number(izquierdo) * derecho.charCodeAt(0);
                    }
                    else
                    {
                        return new Excepcion("Arithmetic Exception", "Operandos erroneos para *", this.linea, this.columna);
                    }
                }
                else if(this.operando1?.tipo.getTipos() == tipos.DECIMAL)
                {
                    if(this.operando2?.tipo.getTipos() == tipos.ENTERO)//DOUBLE*INTEGER
                    {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return Number(izquierdo) * Number(derecho);
                    }
                    else if(this.operando2?.tipo.getTipos() == tipos.DECIMAL)//DOUBLE*DOUBLE
                    {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return Number(izquierdo) * Number(derecho);
                    }
                    else if(this.operando2?.tipo.getTipos() == tipos.CARACTER)//DOUBLE*CHAR
                    {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return Number(izquierdo) * derecho.charCodeAt(0);
                    }
                    else
                    {
                        return new Excepcion("Arithmetic Exception", "Operandos erroneos para *", this.linea, this.columna);
                    }
                }
                else if(this.operando1?.tipo.getTipos() == tipos.CARACTER)
                {
                    if(this.operando2?.tipo.getTipos() == tipos.ENTERO)//CHAR*INTEGER
                    {
                        this.tipo = new Tipo(tipos.ENTERO);
                        return izquierdo.charCodeAt(0) * Number(derecho);
                    }
                    else if(this.operando2?.tipo.getTipos() == tipos.DECIMAL)//CHAR*DOUBLE
                    {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return izquierdo.charCodeAt(0) * Number(derecho);
                    }
                    else if(this.operando2?.tipo.getTipos() == tipos.CARACTER)//CHAR*CHAR
                    {
                        this.tipo = new Tipo(tipos.ENTERO);
                        return izquierdo.charCodeAt(0) * derecho.charCodeAt(0);
                    }
                    else
                    {
                        return new Excepcion("Arithmetic Exception", "Operandos erroneos para *", this.linea, this.columna);
                    }
                }
                else
                {
                    return new Excepcion("Arithmetic Exception", "Operandos erroneos para *", this.linea, this.columna);
                }
            }
        }
        else if(this.operador == OperadorAritmetico.DIVISION)
        {
            if ((izquierdo != undefined && izquierdo != null) && (derecho != undefined && derecho != null)) {
                if(this.operando1?.tipo.getTipos() == tipos.ENTERO)
                {
                    if(this.operando2?.tipo.getTipos() == tipos.ENTERO)//INTEGER/INTEGER
                    {
                        this.tipo = new Tipo(tipos.ENTERO);
                        if(Number(derecho)==0)
                        {
                            return new Excepcion("Arithmetic Exception", "No se puede dividir entre 0", this.linea, this.columna);
                        }
                        return Number(izquierdo) / Number(derecho);
                    }
                    else if(this.operando2?.tipo.getTipos() == tipos.DECIMAL)//INTEGER/DOUBLE
                    {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        if(Number(derecho)==0)
                        {
                            return new Excepcion("Arithmetic Exception", "No se puede dividir entre 0", this.linea, this.columna);
                        }
                        return Number(izquierdo) / Number(derecho);
                    }
                    else if(this.operando2?.tipo.getTipos() == tipos.CARACTER)//INTEGER/CHAR
                    {
                        this.tipo = new Tipo(tipos.ENTERO);
                        if(derecho.charCodeAt(0)==0)
                        {
                            return new Excepcion("Arithmetic Exception", "No se puede dividir entre 0", this.linea, this.columna);
                        }
                        return Number(izquierdo) / derecho.charCodeAt(0);
                    }
                    else
                    {
                        return new Excepcion("Arithmetic Exception", "Operandos erroneos para /", this.linea, this.columna);
                    }
                }
                else if(this.operando1?.tipo.getTipos() == tipos.DECIMAL)
                {
                    if(this.operando2?.tipo.getTipos() == tipos.ENTERO)//DOUBLE/INTEGER
                    {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        if(Number(derecho)==0)
                        {
                            return new Excepcion("Arithmetic Exception", "No se puede dividir entre 0", this.linea, this.columna);
                        }
                        return Number(izquierdo) / Number(derecho);
                    }
                    else if(this.operando2?.tipo.getTipos() == tipos.DECIMAL)//DOUBLE/DOUBLE
                    {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        if(Number(derecho)==0)
                        {
                            return new Excepcion("Arithmetic Exception", "No se puede dividir entre 0", this.linea, this.columna);
                        }
                        return Number(izquierdo) / Number(derecho);
                    }
                    else if(this.operando2?.tipo.getTipos() == tipos.CARACTER)//DOUBLE/CHAR
                    {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        if(derecho.charCodeAt(0)==0)
                        {
                            return new Excepcion("Arithmetic Exception", "No se puede dividir entre 0", this.linea, this.columna);
                        }
                        return Number(izquierdo) / derecho.charCodeAt(0);
                    }
                    else
                    {
                        return new Excepcion("Arithmetic Exception", "Operandos erroneos para /", this.linea, this.columna);
                    }
                }
                else if(this.operando1?.tipo.getTipos() == tipos.CARACTER)
                {
                    if(this.operando2?.tipo.getTipos() == tipos.ENTERO)//CHAR/INTEGER
                    {
                        this.tipo = new Tipo(tipos.ENTERO);
                        if(Number(derecho)==0)
                        {
                            return new Excepcion("Arithmetic Exception", "No se puede dividir entre 0", this.linea, this.columna);
                        }
                        return izquierdo.charCodeAt(0) / Number(derecho);
                    }
                    else if(this.operando2?.tipo.getTipos() == tipos.DECIMAL)//CHAR/DOUBLE
                    {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        if(Number(derecho)==0)
                        {
                            return new Excepcion("Arithmetic Exception", "No se puede dividir entre 0", this.linea, this.columna);
                        }
                        return izquierdo.charCodeAt(0) / Number(derecho);
                    }
                    else if(this.operando2?.tipo.getTipos() == tipos.CARACTER)//CHAR/CHAR
                    {
                        this.tipo = new Tipo(tipos.ENTERO);
                        if(derecho.charCodeAt(0)==0)
                        {
                            return new Excepcion("Arithmetic Exception", "No se puede dividir entre 0", this.linea, this.columna);
                        }
                        return izquierdo.charCodeAt(0) / derecho.charCodeAt(0);
                    }
                    else
                    {
                        return new Excepcion("Arithmetic Exception", "Operandos erroneos para /", this.linea, this.columna);
                    }
                }
                else
                {
                    return new Excepcion("Arithmetic Exception", "Operandos erroneos para /", this.linea, this.columna);
                }
            }
        }
        else if(this.operador == OperadorAritmetico.MENOSUNARIO)
        {
            if ((unario != undefined && unario != null)) {
                if(this.operandoU?.tipo.getTipos() == tipos.ENTERO)
                {
                    this.tipo = new Tipo(tipos.ENTERO);
                    return Number(unario) * -1;
                }
                else if(this.operandoU?.tipo.getTipos() == tipos.DECIMAL)
                {
                    this.tipo = new Tipo(tipos.DECIMAL);
                    return Number(unario) * -1;
                }
                else
                {
                    return new Excepcion("Arithmetic Exception", "Operandos erroneos para - unario", this.linea, this.columna);
                }
            }
        }
        else
        {
            return new Excepcion("Semántico","Tipo de Operación Erróneo.",this.linea,this.columna);
        }
    }
        
}
    

export enum OperadorAritmetico{
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    MENOSUNARIO
}