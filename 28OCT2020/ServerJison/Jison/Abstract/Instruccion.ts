import nodoAST from "./nodoAST";
import Arbol from "../tablaSimbolos/Arbol";
import Tipo from "../tablaSimbolos/Tipo";
import TablaSimbolos from "../tablaSimbolos/tablaSimbolos";

export abstract class Instruccion{

    public linea : Number;
    public columna : Number;
    public tipo: Tipo;


    constructor(tipo:Tipo, linea : Number, columna:Number){
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
    }

    abstract ejecutar(arbol : Arbol, tabla : TablaSimbolos):any;
    abstract getNodo():nodoAST;
}