import nodoAST from "./nodoAST";
import Arbol from "../tablaSimbolos/Arbol";
import Tipo from "../tablaSimbolos/Tipo";

export abstract class Instruccion{

    public linea : Number;
    public columna : Number;
    public tipo: Tipo;


    constructor(tipo:Tipo, linea : Number, columna:Number){
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
    }

    abstract ejecutar(arbol : Arbol):any;
    abstract getNodo():nodoAST;
}