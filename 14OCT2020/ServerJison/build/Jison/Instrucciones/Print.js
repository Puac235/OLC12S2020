"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class Print extends instruccion_1.Instruccion {
    constructor(expresion, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
    }
    getNodo() {
        var nodo = new nodoAST_1.default("PRINT");
        nodo.agregarHijo2(this.expresion.getNodo());
        return nodo;
    }
    traducir() {
        var value = this.expresion.traducir();
        return `imprimir ( ${value} );\n`;
    }
}
exports.default = Print;
//# sourceMappingURL=Print.js.map