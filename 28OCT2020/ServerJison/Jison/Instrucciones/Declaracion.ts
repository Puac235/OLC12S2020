import { Instruccion } from "../Abstract/instruccion";
import nodoAST from "../Abstract/nodoAST";
import Tipo, { tipos } from "../tablaSimbolos/Tipo";
import Arbol from "../tablaSimbolos/Arbol";
import TablaSimbolos from "../tablaSimbolos/tablaSimbolos";
import Excepcion from "../Excepciones/Excepcion";
import Simbolo from "../tablaSimbolos/Simbolo";

export default class Declaracion extends Instruccion
{
    private expresion:Instruccion;
    private identificador:String;


    constructor(tipo:Tipo, identificador:String, expresion:Instruccion, linea:Number, columna:Number){
        super(tipo,linea,columna);
        this.identificador = identificador;
        this.expresion = expresion;
    }

    public getNodo() {
        var nodo  = new nodoAST("DECLARACION");
        nodo.agregarHijo(this.tipo + "");
        nodo.agregarHijo(this.identificador);
        nodo.agregarHijo2(this.expresion.getNodo());
        return nodo;
    }

    public ejecutar(tree:Arbol, tabla : TablaSimbolos):any
    {
        var value = this.expresion.ejecutar(tree, tabla);
        if(value instanceof(Excepcion)) return value;

        if(this.expresion.tipo.getTipos() != this.tipo.getTipos()) return new Excepcion("Type Exception", "El tipo debe de ser el mismo.", this.linea, this.columna);
        
        var simbolo = new Simbolo(this.tipo, this.identificador, value);
        
        if(tabla.setVariable(simbolo)!=null) return new Excepcion("Declaration Exception", `La variable con el identificador: ${this.identificador} ya existe.`, this.linea, this.columna);

        return null;
    }
}