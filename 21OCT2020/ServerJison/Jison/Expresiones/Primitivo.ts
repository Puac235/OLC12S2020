  
import { Instruccion } from "../Abstract/instruccion";
import Arbol from "../tablaSimbolos/Arbol";
import Tipo, { tipos } from "../tablaSimbolos/Tipo";
import nodoAST from "../Abstract/nodoAST";


export default class Primitivo extends Instruccion
{
    private valor:String;

    constructor(valor:String, Tipo:Tipo, fila:Number, columna:Number)
    {
        super(Tipo, fila, columna);
        this.valor = valor;
    }
    public getNodo() {
        var nodo  = new nodoAST("PRIMITIVO");

        nodo.agregarHijo(this.valor);
        
        return nodo;
    }

    public ejecutar(tree:Arbol):any
    {
        if(this.valor == 'true')
        {
            return true;
        }
        else if(this.valor == 'false')
        {
            return false;
        }
        return this.valor;
    }
}