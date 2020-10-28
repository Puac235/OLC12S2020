import { Instruccion } from "../Abstract/instruccion";
import Tipo, {tipos} from "../tablaSimbolos/Tipo";
import Arbol from "../tablaSimbolos/Arbol";
import Excepcion from "../Excepciones/Excepcion";
import nodoAST from "../Abstract/nodoAST";
import TablaSimbolos from "../tablaSimbolos/tablaSimbolos";

export default class Relacional extends Instruccion
{

    private operando1:Instruccion;
    private operando2:Instruccion;
    private operador:OperadorRelacional;

    constructor(operando1:Instruccion, operando2:Instruccion, operador:OperadorRelacional, fila:Number, columna:Number)
    {
        super(new Tipo(tipos.BOOLEANO),fila,columna);
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

    public ejecutar(tree:Arbol, tabla : TablaSimbolos):any
    {
        var izquierdo = null, derecho = null;

        izquierdo = this.operando1.ejecutar(tree, tabla);
        if (izquierdo instanceof Excepcion) return izquierdo;

        derecho = this.operando2.ejecutar(tree, tabla);
        if (derecho instanceof Excepcion) return derecho;

        this.tipo = new Tipo(tipos.BOOLEANO);
        if(this.operador == OperadorRelacional.MENORQUE)
        {
            if(this.operando1.tipo.getTipos() == tipos.ENTERO)
            {
                if(this.operando2.tipo.getTipos() == tipos.ENTERO){
                    return Number(izquierdo) < Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.DECIMAL){
                    return Number(izquierdo) < Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.CARACTER){
                    return Number(izquierdo) < derecho.charCodeAt(0);
                }
                else
                {
                    return new Excepcion("Arithmetic Exception", "Operandos erroneos para <", this.linea, this.columna);
                }
            }
            else if(this.operando1.tipo.getTipos() == tipos.DECIMAL)
            {
                if(this.operando2.tipo.getTipos() == tipos.ENTERO){
                    return Number(izquierdo) < Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.DECIMAL){
                    return Number(izquierdo) < Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.CARACTER){
                    return Number(izquierdo) < derecho.charCodeAt(0);
                }
                else
                {
                    return new Excepcion("Arithmetic Exception", "Operandos erroneos para <", this.linea, this.columna);
                }
            }
            else if(this.operando1?.tipo.getTipos() == tipos.CARACTER)
            {
                if(this.operando2.tipo.getTipos() == tipos.ENTERO){
                    return izquierdo.charCodeAt(0) < Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.DECIMAL){
                    return Number(izquierdo) < Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.CARACTER){
                    return izquierdo.charCodeAt(0) < derecho.charCodeAt(0);
                }
                else
                {
                    return new Excepcion("Arithmetic Exception", "Operandos erroneos para <", this.linea, this.columna);
                }
            }
            else
            {
                return new Excepcion("Arithmetic Exception", "Operandos erroneos para <", this.linea, this.columna);
            }
        }
        else if(this.operador == OperadorRelacional.MAYORQUE)
        {
            if(this.operando1.tipo.getTipos() == tipos.ENTERO)
            {
                if(this.operando2.tipo.getTipos() == tipos.ENTERO){
                    return Number(izquierdo) > Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.DECIMAL){
                    return Number(izquierdo) > Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.CARACTER){
                    return Number(izquierdo) > derecho.charCodeAt(0);
                }
                else
                {
                    return new Excepcion("Arithmetic Exception", "Operandos erroneos para >", this.linea, this.columna);
                }
            }
            else if(this.operando1.tipo.getTipos() == tipos.DECIMAL)
            {
                if(this.operando2.tipo.getTipos() == tipos.ENTERO){
                    return Number(izquierdo) > Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.DECIMAL){
                    return Number(izquierdo) > Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.CARACTER){
                    return Number(izquierdo) > derecho.charCodeAt(0);
                }
                else
                {
                    return new Excepcion("Arithmetic Exception", "Operandos erroneos para >", this.linea, this.columna);
                }
            }
            else if(this.operando1?.tipo.getTipos() == tipos.CARACTER)
            {
                if(this.operando2.tipo.getTipos() == tipos.ENTERO){
                    return izquierdo.charCodeAt(0) > Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.DECIMAL){
                    return Number(izquierdo) > Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.CARACTER){
                    return izquierdo.charCodeAt(0) > derecho.charCodeAt(0);
                }
                else
                {
                    return new Excepcion("Arithmetic Exception", "Operandos erroneos para >", this.linea, this.columna);
                }
            }
            else
            {
                return new Excepcion("Arithmetic Exception", "Operandos erroneos para >", this.linea, this.columna);
            }
        }
        else if(this.operador == OperadorRelacional.MENORIGUAL)
        {
            if(this.operando1.tipo.getTipos() == tipos.ENTERO)
            {
                if(this.operando2.tipo.getTipos() == tipos.ENTERO){
                    return Number(izquierdo) <= Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.DECIMAL){
                    return Number(izquierdo) <= Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.CARACTER){
                    return Number(izquierdo) <= derecho.charCodeAt(0);
                }
                else
                {
                    return new Excepcion("Arithmetic Exception", "Operandos erroneos para <=", this.linea, this.columna);
                }
            }
            else if(this.operando1.tipo.getTipos() == tipos.DECIMAL)
            {
                if(this.operando2.tipo.getTipos() == tipos.ENTERO){
                    return Number(izquierdo) <= Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.DECIMAL){
                    return Number(izquierdo) <= Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.CARACTER){
                    return Number(izquierdo) <= derecho.charCodeAt(0);
                }
                else
                {
                    return new Excepcion("Arithmetic Exception", "Operandos erroneos para <=", this.linea, this.columna);
                }
            }
            else if(this.operando1?.tipo.getTipos() == tipos.CARACTER)
            {
                if(this.operando2.tipo.getTipos() == tipos.ENTERO){
                    return izquierdo.charCodeAt(0) <= Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.DECIMAL){
                    return Number(izquierdo) <= Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.CARACTER){
                    return izquierdo.charCodeAt(0) <= derecho.charCodeAt(0);
                }
                else
                {
                    return new Excepcion("Arithmetic Exception", "Operandos erroneos para <=", this.linea, this.columna);
                }
            }
            else
            {
                return new Excepcion("Arithmetic Exception", "Operandos erroneos para <=", this.linea, this.columna);
            }
        }
        else if(this.operador == OperadorRelacional.MAYORIGUAL)
        {
            if(this.operando1.tipo.getTipos() == tipos.ENTERO)
            {
                if(this.operando2.tipo.getTipos() == tipos.ENTERO){
                    return Number(izquierdo) >= Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.DECIMAL){
                    return Number(izquierdo) >= Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.CARACTER){
                    return Number(izquierdo) >= derecho.charCodeAt(0);
                }
                else
                {
                    return new Excepcion("Arithmetic Exception", "Operandos erroneos para >=", this.linea, this.columna);
                }
            }
            else if(this.operando1.tipo.getTipos() == tipos.DECIMAL)
            {
                if(this.operando2.tipo.getTipos() == tipos.ENTERO){
                    return Number(izquierdo) >= Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.DECIMAL){
                    return Number(izquierdo) >= Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.CARACTER){
                    return Number(izquierdo) >= derecho.charCodeAt(0);
                }
                else
                {
                    return new Excepcion("Arithmetic Exception", "Operandos erroneos para >=", this.linea, this.columna);
                }
            }
            else if(this.operando1?.tipo.getTipos() == tipos.CARACTER)
            {
                if(this.operando2.tipo.getTipos() == tipos.ENTERO){
                    return izquierdo.charCodeAt(0) >= Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.DECIMAL){
                    return Number(izquierdo) >= Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.CARACTER){
                    return izquierdo.charCodeAt(0) >= derecho.charCodeAt(0);
                }
                else
                {
                    return new Excepcion("Arithmetic Exception", "Operandos erroneos para >=", this.linea, this.columna);
                }
            }
            else
            {
                return new Excepcion("Arithmetic Exception", "Operandos erroneos para >=", this.linea, this.columna);
            }
        }
        else if(this.operador == OperadorRelacional.IGUALACION)
        {
            if(this.operando1.tipo.getTipos() == tipos.ENTERO)
            {
                if(this.operando2.tipo.getTipos() == tipos.ENTERO){
                    return Number(izquierdo) == Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.DECIMAL){
                    return Number(izquierdo) == Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.CARACTER){
                    return Number(izquierdo) == derecho.charCodeAt(0);
                }
                else
                {
                    return new Excepcion("Arithmetic Exception", "Operandos erroneos para ==", this.linea, this.columna);
                }
            }
            else if(this.operando1.tipo.getTipos() == tipos.DECIMAL)
            {
                if(this.operando2.tipo.getTipos() == tipos.ENTERO){
                    return Number(izquierdo) == Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.DECIMAL){
                    return Number(izquierdo) == Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.CARACTER){
                    return Number(izquierdo) == derecho.charCodeAt(0);
                }
                else
                {
                    return new Excepcion("Arithmetic Exception", "Operandos erroneos para ==", this.linea, this.columna);
                }
            }
            else if(this.operando1?.tipo.getTipos() == tipos.CARACTER)
            {
                if(this.operando2.tipo.getTipos() == tipos.ENTERO){
                    return izquierdo.charCodeAt(0) == Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.DECIMAL){
                    return Number(izquierdo) == Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.CARACTER){
                    return izquierdo.charCodeAt(0) == derecho.charCodeAt(0);
                }
                else
                {
                    return new Excepcion("Arithmetic Exception", "Operandos erroneos para ==", this.linea, this.columna);
                }
            }
            else
            {
                return new Excepcion("Arithmetic Exception", "Operandos erroneos para ==", this.linea, this.columna);
            }
        }
        else if(this.operador == OperadorRelacional.DIFERENCIACION)
        {
            if(this.operando1.tipo.getTipos() == tipos.ENTERO)
            {
                if(this.operando2.tipo.getTipos() == tipos.ENTERO){
                    return Number(izquierdo) != Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.DECIMAL){
                    return Number(izquierdo) != Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.CARACTER){
                    return Number(izquierdo) != derecho.charCodeAt(0);
                }
                else
                {
                    return new Excepcion("Arithmetic Exception", "Operandos erroneos para !=", this.linea, this.columna);
                }
            }
            else if(this.operando1.tipo.getTipos() == tipos.DECIMAL)
            {
                if(this.operando2.tipo.getTipos() == tipos.ENTERO){
                    return Number(izquierdo) != Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.DECIMAL){
                    return Number(izquierdo) != Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.CARACTER){
                    return Number(izquierdo) != derecho.charCodeAt(0);
                }
                else
                {
                    return new Excepcion("Arithmetic Exception", "Operandos erroneos para !=", this.linea, this.columna);
                }
            }
            else if(this.operando1?.tipo.getTipos() == tipos.CARACTER)
            {
                if(this.operando2.tipo.getTipos() == tipos.ENTERO){
                    return izquierdo.charCodeAt(0) != Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.DECIMAL){
                    return Number(izquierdo) != Number(derecho);
                }
                else if(this.operando2.tipo.getTipos() == tipos.CARACTER){
                    return izquierdo.charCodeAt(0) != derecho.charCodeAt(0);
                }
                else
                {
                    return new Excepcion("Arithmetic Exception", "Operandos erroneos para !=", this.linea, this.columna);
                }
            }
            else
            {
                return new Excepcion("Arithmetic Exception", "Operandos erroneos para !=", this.linea, this.columna);
            }
        }
        else
        {
            return new Excepcion("Semántico","Tipo de Operación Erróneo.",this.linea,this.columna);
        }
    }
}

export enum OperadorRelacional{
    MAYORQUE,
    MENORQUE,
    MAYORIGUAL,
    MENORIGUAL,
    IGUALACION,
    DIFERENCIACION
}