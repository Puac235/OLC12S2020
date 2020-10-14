"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instruccion = void 0;
class Instruccion {
    constructor(linea, columna) {
        this.linea = linea;
        this.columna = columna;
    }
    setSalida(salida) {
        this.salida = salida;
    }
    getSalida() {
        return this.salida;
    }
}
exports.Instruccion = Instruccion;
//# sourceMappingURL=instruccion.js.map