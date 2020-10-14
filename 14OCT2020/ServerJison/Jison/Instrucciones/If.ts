  
import { Instruccion } from "../Abstract/instruccion";
import nodoAST from "../Abstract/nodoAST";

export default class If extends Instruccion
{
    private condicion:Instruccion;
    private instruccionesIf:Array<Instruccion>;
    private instruccionesElse:Array<Instruccion> | undefined;
    private elseif:Instruccion | undefined;

    constructor(condicion:Instruccion, instruccionesIf:Array<Instruccion>, linea:Number, columna:Number, instruccionesElse?:Array<Instruccion>|Instruccion){
        super(linea,columna);
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
            cas.agregarHijo2(m.getNodo());
        }
        nodo.agregarHijo2(cas);
        nodo.agregarHijo("}");
        if(this.instruccionesElse != undefined){
                
            nodo.agregarHijo("ELSE");
            nodo.agregarHijo("{");
            var el = new nodoAST("INSTRUCCIONES ELSE");
            for (let m of this.instruccionesElse) {
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

    public traducir()
    {
        var val = ''
        var condicion = this.condicion.traducir();
        var instruccionesIF:String = '';
        for(let insIf of this.instruccionesIf)
        {
            instruccionesIF += `${insIf.traducir()}\n`;
        }

        val += `si ( ${condicion} ) {\n${instruccionesIF} }`;

        if(this.elseif != undefined)
        {
            val += `sino ${this.elseif.traducir()}`;
        }
        else if(this.instruccionesElse != undefined)
        {
            var instruccionesELSE:String = '';
            for(let insElse of this.instruccionesElse)
            {
                instruccionesELSE += `${insElse.traducir()}\n`;
            }
            val += `sino {\n${instruccionesELSE} }`;
        }

        return val + '\n';
    }
}
