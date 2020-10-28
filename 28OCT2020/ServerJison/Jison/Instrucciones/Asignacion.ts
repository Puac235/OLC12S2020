import { Instruccion } from "../Abstract/instruccion";
import nodoAST from "../Abstract/nodoAST";
import Tipo, { tipos } from "../tablaSimbolos/Tipo";
import Arbol from "../tablaSimbolos/Arbol";
import TablaSimbolos from "../tablaSimbolos/tablaSimbolos";
import Excepcion from "../Excepciones/Excepcion";
import Simbolo from "../tablaSimbolos/Simbolo";

export default class Asignacion extends Instruccion
{
    private expresion:Instruccion;
    private identificador:String;


    constructor(identificador:String, expresion:Instruccion, linea:Number, columna:Number){
        super(new Tipo(tipos.ENTERO),linea,columna);
        this.identificador = identificador;
        this.expresion = expresion;
    }

    public getNodo() {
        var nodo  = new nodoAST("ASIGNACION");
        nodo.agregarHijo(this.identificador);
        nodo.agregarHijo2(this.expresion.getNodo());
        return nodo;
    }

    public ejecutar(tree:Arbol, tabla : TablaSimbolos):any
    {
        var value = this.expresion.ejecutar(tree, tabla);
        if(value instanceof(Excepcion)) return value;

        var simbolo = tabla.getVariable(this.identificador);
        if(simbolo == null)
        {
            return new Excepcion("Semantico","Variable " + this.identificador + " no definida.", this.linea, this.columna)
        }

        if(this.expresion.tipo.getTipos() != simbolo.getTipo().getTipos()) return new Excepcion("Type Exception", "El tipo debe de ser el mismo.", this.linea, this.columna);
        
        simbolo.setValor(value);
    
        return null;
    }
}