export default class Tipo
{
    private tipos: tipos;
    private tipoStruct: String | any;

    constructor(tipos: tipos, tipoStruct? : String){
        this.tipos = tipos;
        this.tipoStruct = tipoStruct;
    }

    public toString() {
        if(this.tipoStruct==undefined)
        {
            return this.tipos + "";
        }
        return this.tipos + "." + this.tipoStruct;
    }

    public equals(obj: Tipo){
        if(this.tipoStruct == undefined && obj.tipoStruct == undefined)
        {
            return this.tipos == obj.tipos;
        }
        else if (this.tipoStruct != undefined && obj.tipoStruct != undefined) {
            return this.tipoStruct == obj.tipoStruct;
        }
        return false;
    }

    public getTipos():tipos
    {
        return this.tipos;
    }
    public setTipos(tipo: tipos)
    {
        this.tipos = tipo;
    }
    public gettipoStruct():String
    {
        return this.tipoStruct;
    }
    public settipoStruct(tipoStruct: String)
    {
        this.tipoStruct = tipoStruct;
    }
}

export enum tipos {
    ENTERO,
    DECIMAL,
    CARACTER,
    BOOLEANO,
    CADENA,
}