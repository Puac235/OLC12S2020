  
import { Instruccion } from "../Abstract/instruccion";
import Tipo, { tipos } from "../tablaSimbolos/Tipo";
import Arbol from "../tablaSimbolos/Arbol";
import nodoAST from "../Abstract/nodoAST";
import Excepcion from "../Excepciones/Excepcion";
import TablaSimbolos from "../tablaSimbolos/tablaSimbolos";

export default class If extends Instruccion
{
    private condicion:Instruccion;
    private instruccionesIf:Array<Instruccion>;
    private instruccionesElse:Array<Instruccion> | undefined;
    private elseif:Instruccion | undefined;

    constructor(condicion:Instruccion, instruccionesIf:Array<Instruccion>, linea:Number, columna:Number, instruccionesElse?:Array<Instruccion>|Instruccion){
        super(new Tipo(tipos.ENTERO),linea,columna);
        this.condicion = condicion;
        this.instruccionesIf = instruccionesIf;
        if(instruccionesElse)
        {
            if(instruccionesElse instanceof Instruccion)
            {
                this.elseif = instruccionesElse;
            }
            else
            {
                this.instruccionesElse = instruccionesElse;
            }
        }
    }

    public getNodo() {
        var nodo  = new nodoAST("IF");
        nodo.agregarHijo("if");
        nodo.agregarHijo("(");
        nodo.agregarHijo2(this.condicion.getNodo());
        nodo.agregarHijo(")");
        nodo.agregarHijo("{");
        var cas = new nodoAST("INSTRUCCIONES IF");
        for (let m of this.instruccionesIf) {
            if(m instanceof Excepcion) continue;
            cas.agregarHijo2(m.getNodo());
        }
        nodo.agregarHijo2(cas);
        nodo.agregarHijo("}");
        if(this.instruccionesElse != undefined){
                
            nodo.agregarHijo("ELSE");
            nodo.agregarHijo("{");
            var el = new nodoAST("INSTRUCCIONES ELSE");
            for (let m of this.instruccionesElse) {
                if(m instanceof Excepcion) continue;
                el.agregarHijo2(m.getNodo());
            }
            nodo.agregarHijo2(el);
            nodo.agregarHijo("}");
        }
        if(this.elseif != undefined)
        {
            var elif = new nodoAST("ELSE IF");
            elif.agregarHijo2(this.elseif.getNodo());
            nodo.agregarHijo2(elif);
        }
        
        return nodo;
    }

    public ejecutar(tree:Arbol, tabla : TablaSimbolos):any
    {

        var condicion = this.condicion.ejecutar(tree, tabla);
        if(condicion instanceof(Excepcion)) return condicion;
        if(this.condicion.tipo.getTipos() != tipos.BOOLEANO) return new Excepcion("Boolean Exception", "El valor de la condicion debe ser booleano.", this.linea, this.columna);
        
        if(condicion)
        {
            var nuevaTabla = new TablaSimbolos(tabla);
            for(let insIf of this.instruccionesIf)
            {
                if(insIf instanceof Excepcion){
                    tree.setConsola(`${(<Excepcion>insIf).imprimir()}`);
                    continue;
                }
                var instr = insIf.ejecutar(tree, nuevaTabla);
                if(instr instanceof(Excepcion)) tree.setConsola(`${instr.imprimir()}`);
            }
        }
        else
        {
            if(this.elseif != undefined)
            {
                var instr = this.elseif.ejecutar(tree, tabla);
                if(instr instanceof(Excepcion)) return instr;
            }
            else if(this.instruccionesElse != undefined)
            {
                var nuevaTabla = new TablaSimbolos(tabla);
                for(let insElse of this.instruccionesElse)
                {
                    if(insElse instanceof Excepcion){
                        tree.setConsola(`${(<Excepcion>insElse).imprimir()}`);
                        continue;
                    }  
                    var instr = insElse.ejecutar(tree, nuevaTabla);
                    if(instr instanceof(Excepcion)) tree.setConsola(`${instr.imprimir()}`);
                }
            }
        }

        return null;
    }
}
