export default class Excepcion{
    private tipo: String;
    private descripcion: String;
    private fila: Number;
    private columna: Number;
    

    constructor(tipo: String, descripcion:String, fila:Number, columna:Number)
    {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.fila = fila;
        this.columna = columna;
    }

    public toString():String
    {
        return this.tipo + " - " + this.descripcion + " [" + this.fila + ", " + this.columna + "]";
    }
    public imprimir(){
        return this.toString() + "\n";
    }
    public getTipo():String
    {
        return this.tipo;
    }
    public getDesc():String
    {
        return this.descripcion;
    }
    public getFila():Number
    {
        return this.fila;
    }
    public getColumna():Number
    {
        return this.columna;
    }
}