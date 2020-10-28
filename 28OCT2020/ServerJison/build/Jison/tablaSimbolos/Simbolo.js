"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Simbolo {
    constructor(tipo, identificador, valor) {
        this.tipo = tipo;
        this.identificador = identificador;
        this.valor = valor;
    }
    getIdentificador() {
        return this.identificador;
    }
    setIdentificador(identificador) {
        this.identificador = identificador;
    }
    getTipo() {
        return this.tipo;
    }
    setTipo(tipo) {
        this.tipo = tipo;
    }
    getValor() {
        return this.valor;
    }
    setValor(valor) {
        this.valor = valor;
    }
}
exports.default = Simbolo;
//# sourceMappingURL=Simbolo.js.map