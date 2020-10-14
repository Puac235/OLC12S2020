"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class Identificador extends instruccion_1.Instruccion {
    constructor(identificador, fila, columna) {
        super(fila, columna);
        this.identificador = identificador;
    }
    getNodo() {
        var nodo = new nodoAST_1.default("IDENTIFICADOR");
        nodo.agregarHijo(this.identificador);
        return nodo;
    }
    traducir() {
        return this.identificador;
    }
}
exports.default = Identificador;
//# sourceMappingURL=Identificador.js.map