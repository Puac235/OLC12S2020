import { Instruccion } from "../Abstract/instruccion";
import nodoAST from "../Abstract/nodoAST";

export default class While extends Instruccion
{
    private condicion:Instruccion;
    private instrucciones:Array<Instruccion>;

    constructor(condicion:Instruccion, instrucciones:Array<Instruccion>, linea:Number, columna:Number){
        super(linea,columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }

    public getNodo() {
        var nodo  = new nodoAST("WHILE");
        nodo.agregarHijo("while");
        nodo.agregarHijo("(");
        nodo.agregarHijo2(this.condicion.getNodo());
        nodo.agregarHijo(")");
        nodo.agregarHijo("{");
        
        var cas = new nodoAST("INSTRUCCIONES");
        for(let m of this.instrucciones){
            cas.agregarHijo2(m.getNodo());
        }
        nodo.agregarHijo2(cas);
        nodo.agregarHijo("}");
        return nodo;
    }

    public traducir():any
    {
        var condicion = this.condicion.traducir();
        var instrucciones = '';
        for(let instr of this.instrucciones)
        {
             instrucciones += instr.traducir();
        }
        return `mientras ( ${condicion} ) {\n${instrucciones}}\n`

    }
}