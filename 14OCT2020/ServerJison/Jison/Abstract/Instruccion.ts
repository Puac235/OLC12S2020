import nodoAST from "./nodoAST";

export abstract class Instruccion{

    public linea : Number;
    public columna : Number;
    private salida:String|undefined;


    constructor(linea : Number, columna:Number){
        this.linea = linea;
        this.columna = columna;
    }

    public setSalida(salida:String|undefined)
    {
        this.salida = salida;
    }

    public getSalida()
    {
        return this.salida;
    }

    abstract traducir():any;
    abstract getNodo():nodoAST;
}