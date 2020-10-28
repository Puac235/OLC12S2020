import { Instruccion } from "../Abstract/instruccion";
import Tipo, { tipos } from "../tablaSimbolos/Tipo";
import Arbol from "../tablaSimbolos/Arbol";
import nodoAST from "../Abstract/nodoAST";
import Excepcion from "../Excepciones/Excepcion";
import TablaSimbolos from "../tablaSimbolos/tablaSimbolos";

export default class While extends Instruccion
{
    private condicion:Instruccion;
    private instrucciones:Array<Instruccion>;

    constructor(condicion:Instruccion, instrucciones:Array<Instruccion>, linea:Number, columna:Number){
        super(new Tipo(tipos.ENTERO),linea,columna);
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
            if(m instanceof Excepcion) continue;
            cas.agregarHijo2(m.getNodo());
        }
        nodo.agregarHijo2(cas);
        nodo.agregarHijo("}");
        return nodo;
    }

    public ejecutar(tree:Arbol, tabla : TablaSimbolos):any
    {
        while(true)
        {
            var condicion = this.condicion.ejecutar(tree, tabla);
            if(condicion instanceof(Excepcion)) return condicion;
            if(this.condicion.tipo.getTipos() != tipos.BOOLEANO) return new Excepcion("Boolean Exception", "El valor de la condicion debe ser booleano.", this.linea, this.columna);
            if(condicion)
            {
                var nuevaTabla = new TablaSimbolos(tabla);
                for(let insWhile of this.instrucciones)
                {
                    if(insWhile instanceof Excepcion){
                        tree.setConsola(`${(<Excepcion>insWhile).imprimir()}`);
                        continue;
                    } 
                    
                    var instr = insWhile.ejecutar(tree, nuevaTabla);
                    if(instr instanceof(Excepcion)) tree.setConsola(`${instr.imprimir()}`);
                }
            }
            else
            {
                break;
            }
        }
        
        return null;

    }
}