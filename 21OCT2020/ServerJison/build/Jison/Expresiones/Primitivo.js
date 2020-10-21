"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class Primitivo extends instruccion_1.Instruccion {
    constructor(valor, Tipo, fila, columna) {
        super(Tipo, fila, columna);
        this.valor = valor;
    }
    getNodo() {
        var nodo = new nodoAST_1.default("PRIMITIVO");
        nodo.agregarHijo(this.valor);
        return nodo;
    }
    ejecutar(tree) {
        if (this.valor == 'true') {
            return true;
        }
        else if (this.valor == 'false') {
            return false;
        }
        return this.valor;
    }
}
exports.default = Primitivo;
//# sourceMappingURL=Primitivo.js.map