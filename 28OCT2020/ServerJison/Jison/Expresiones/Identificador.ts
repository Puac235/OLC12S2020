  
import { Instruccion } from "../Abstract/instruccion";
import nodoAST from "../Abstract/nodoAST";
import Tipo, { tipos } from "../tablaSimbolos/Tipo";
import Arbol from "../tablaSimbolos/Arbol";
import TablaSimbolos from "../tablaSimbolos/tablaSimbolos";
import Excepcion from "../Excepciones/Excepcion";


export default class Identificador extends Instruccion
{
    private identificador:String;

    constructor(identificador:String, fila:Number, columna:Number)
    {
        super(new Tipo(tipos.ENTERO),fila,columna);
        this.identificador = identificador;
    }

    public getNodo() {
        var nodo  = new nodoAST("IDENTIFICADOR");
        nodo.agregarHijo(this.identificador);
        
        return nodo;
    }

    public ejecutar(tree:Arbol, tabla : TablaSimbolos):any
    {
        var simbolo = tabla.getVariable(this.identificador);
        if(simbolo == null)
        {
            return new Excepcion("Semantico","Variable " + this.identificador + " no definida.", this.linea, this.columna)
        }

        this.tipo = simbolo.getTipo();

        return simbolo.getValor();
    }
}