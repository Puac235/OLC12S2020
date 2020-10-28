import Simbolo from "./Simbolo";


export default class TablaSimbolos {

    public table : Map<String,Simbolo>;
    private anterior : TablaSimbolos | any;

    
    constructor (anterior?: TablaSimbolos) {
        this.anterior = anterior;
        this.table = new Map<String,Simbolo>();
    }

    public setVariable(simbolo: Simbolo) {
        for(var e: TablaSimbolos = this; e != null; e = e.getAnterior())
        {
            var encontro:Simbolo = <Simbolo> (e.getTable().get(simbolo.getIdentificador()));
            if(encontro != null)
            {
                return "La variable con el identificador: " + simbolo.getIdentificador() + " ya existe."
            }
            break;
        }
        this.table.set(simbolo.getIdentificador(),simbolo);
        return null;
    }
    
    public getVariable(id: String) {
        
        for(var e: TablaSimbolos = this; e != null; e = e.getAnterior())
        {
            var encontro: Simbolo = <Simbolo> (e.getTable().get(id));
            
            if(encontro != null)
            {
                return encontro;
            }
        }
        return null;
        
    }

    public getTable() {
        return this.table;
    }

    public setTable(Table: Map<String, Simbolo>) {
        this.table = Table;
    }

    public getAnterior() {
        return this.anterior;
    }

    public setAnterior(Anterior: TablaSimbolos) {
        this.anterior = Anterior;
    }

}