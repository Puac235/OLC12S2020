export default class nodoAST {
    public hijos: Array<nodoAST>;
    public valor:String;   

    constructor(valor:String) {
        this.hijos= new Array<nodoAST>();
        this.valor=valor;    
    }

    
    public setHijos(hijos:Array<nodoAST>){
        this.hijos = hijos;
    }
    
    public agregarHijo(cad:String){
        this.hijos.push(new nodoAST(cad));
    }
    
    public agregarHijos(hijos:Array<nodoAST>){
        for(let hijo of hijos)
        {
            this.hijos.push(hijo);
        }
    }
    
    public agregarHijo2(hijo:nodoAST)
    {
        this.hijos.push(hijo);
    }
    
    public agregarPrimerHijo(cad:String)
    {
        this.hijos.unshift(new nodoAST(cad));
    }
    
    public agregarPrimerHijo2(hijo:nodoAST)
    {
        this.hijos.unshift(hijo);
    }
    
    public getValor():String
    {
        return this.valor;
    }
    
    public setValor(cad:String)
    {
        this.valor = cad;
    }
    
    public getHijos():Array<nodoAST>
    {
        return this.hijos;
    }
}