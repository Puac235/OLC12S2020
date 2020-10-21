"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Excepcion {
    constructor(tipo, descripcion, fila, columna) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.fila = fila;
        this.columna = columna;
    }
    toString() {
        return this.tipo + " - " + this.descripcion + " [" + this.fila + ", " + this.columna + "]";
    }
    imprimir() {
        return this.toString() + "\n";
    }
    getTipo() {
        return this.tipo;
    }
    getDesc() {
        return this.descripcion;
    }
    getFila() {
        return this.fila;
    }
    getColumna() {
        return this.columna;
    }
}
exports.default = Excepcion;
//# sourceMappingURL=Excepcion.js.map