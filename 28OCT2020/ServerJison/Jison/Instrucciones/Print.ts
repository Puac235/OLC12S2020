import { Instruccion } from "../Abstract/instruccion";
import Tipo, { tipos } from "../tablaSimbolos/Tipo";
import Arbol from "../tablaSimbolos/Arbol";
import Excepcion from "../Excepciones/Excepcion";
import nodoAST from "../Abstract/nodoAST";
import TablaSimbolos from "../tablaSimbolos/tablaSimbolos";

export default class Print extends Instruccion
{
    private expresion:Instruccion;

    constructor(expresion:Instruccion, linea:Number, columna:Number){
        super(new Tipo(tipos.CADENA),linea,columna);
        this.expresion = expresion;
    }

    public getNodo() {
        var nodo  = new nodoAST("PRINT");
        nodo.agregarHijo("print");
        nodo.agregarHijo("(");
        nodo.agregarHijo2(this.expresion.getNodo());
        nodo.agregarHijo(")");
        nodo.agregarHijo(";");
        return nodo;
    }

    public ejecutar(tree:Arbol, tabla : TablaSimbolos):any
    {
        var value = this.expresion.ejecutar(tree, tabla);
        if(value instanceof Excepcion)
        {
            return value;
        }
        tree.setConsola(`${value}\n`);
        return null;
    }
}