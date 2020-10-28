"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipos = void 0;
class Tipo {
    constructor(tipos, tipoStruct) {
        this.tipos = tipos;
        this.tipoStruct = tipoStruct;
    }
    toString() {
        if (this.tipoStruct == undefined) {
            return this.tipos + "";
        }
        return this.tipos + "." + this.tipoStruct;
    }
    equals(obj) {
        if (this.tipoStruct == undefined && obj.tipoStruct == undefined) {
            return this.tipos == obj.tipos;
        }
        else if (this.tipoStruct != undefined && obj.tipoStruct != undefined) {
            return this.tipoStruct == obj.tipoStruct;
        }
        return false;
    }
    getTipos() {
        return this.tipos;
    }
    setTipos(tipo) {
        this.tipos = tipo;
    }
    gettipoStruct() {
        return this.tipoStruct;
    }
    settipoStruct(tipoStruct) {
        this.tipoStruct = tipoStruct;
    }
}
exports.default = Tipo;
var tipos;
(function (tipos) {
    tipos[tipos["ENTERO"] = 0] = "ENTERO";
    tipos[tipos["DECIMAL"] = 1] = "DECIMAL";
    tipos[tipos["CARACTER"] = 2] = "CARACTER";
    tipos[tipos["BOOLEANO"] = 3] = "BOOLEANO";
    tipos[tipos["CADENA"] = 4] = "CADENA";
})(tipos = exports.tipos || (exports.tipos = {}));
//# sourceMappingURL=Tipo.js.map