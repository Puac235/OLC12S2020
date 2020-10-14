"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class Relacional extends instruccion_1.Instruccion {
    constructor(operando1, operando2, operador, fila, columna) {
        super(fila, columna);
        this.operador = operador;
        this.operando1 = operando1;
        this.operando2 = operando2;
    }
    getNodo() {
        var nodo = new nodoAST_1.default("RELACIONAL");
        nodo.agregarHijo2(this.operando1.getNodo());
        nodo.agregarHijo(this.operador + "");
        nodo.agregarHijo2(this.operando2.getNodo());
        return nodo;
    }
    traducir() {
        return this.operando1.traducir() + this.operador + this.operando2.traducir() + "";
    }
}
exports.default = Relacional;
//# sourceMappingURL=Relacional.js.map