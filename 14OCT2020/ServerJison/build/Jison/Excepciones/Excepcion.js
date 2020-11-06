"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class Excepcion extends instruccion_1.Instruccion {
    constructor(expresion, linea, columna) {
        super(linea, columna);
        this.recuperado = expresion;
    }
    getNodo() {
        var nodo = new nodoAST_1.default("Error Sintáctico");
        return nodo;
    }
    traducir() {
        return ``;
    }
}
exports.default = Excepcion;
//# sourceMappingURL=Excepcion.js.map