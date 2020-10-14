"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class nodoAST {
    constructor(valor) {
        this.hijos = new Array();
        this.valor = valor;
    }
    setHijos(hijos) {
        this.hijos = hijos;
    }
    agregarHijo(cad) {
        this.hijos.push(new nodoAST(cad));
    }
    agregarHijos(hijos) {
        for (let hijo of hijos) {
            this.hijos.push(hijo);
        }
    }
    agregarHijo2(hijo) {
        this.hijos.push(hijo);
    }
    agregarPrimerHijo(cad) {
        this.hijos.unshift(new nodoAST(cad));
    }
    agregarPrimerHijo2(hijo) {
        this.hijos.unshift(hijo);
    }
    getValor() {
        return this.valor;
    }
    setValor(cad) {
        this.valor = cad;
    }
    getHijos() {
        return this.hijos;
    }
}
exports.default = nodoAST;
//# sourceMappingURL=nodoAST.js.map