import Tipo from "./Tipo";

export default class Simbolo
{
    public tipo : Tipo;
    public identificador : String;
    public valor : any;

    constructor(tipo: Tipo, identificador: String, valor: any){
        this.tipo = tipo;
        this.identificador = identificador;
        this.valor = valor;
    }

    public getIdentificador() {
        return this.identificador;
    }

    public setIdentificador(identificador: String) {
        this.identificador = identificador;
    }
    public getTipo(){
        return this.tipo;
    }
    public setTipo(tipo: Tipo)
    {
        this.tipo = tipo;
    }

    public getValor(){
        return this.valor;
    }
    public setValor(valor: String)
    {
        this.valor = valor;
    }

}