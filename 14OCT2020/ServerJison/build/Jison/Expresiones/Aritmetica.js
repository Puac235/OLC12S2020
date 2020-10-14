"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class Aritmetica extends instruccion_1.Instruccion {
    constructor(operador, fila, columna, operando1, operando2) {
        super(fila, columna);
        this.operador = operador;
        if (!operando2) {
            this.operandoU = operando1;
        }
        else {
            this.operando1 = operando1;
            this.operando2 = operando2;
        }
    }
    getNodo() {
        var nodo = new nodoAST_1.default("ARITMETICA");
        if (this.operandoU != null) {
            nodo.agregarHijo(this.operador + "");
            nodo.agregarHijo2(this.operandoU.getNodo());
        }
        else {
            if (this.operando1 != undefined && this.operando2 != undefined) {
                nodo.agregarHijo2(this.operando1.getNodo());
                nodo.agregarHijo(this.operador + "");
                nodo.agregarHijo2(this.operando2.getNodo());
            }
        }
        return nodo;
    }
    traducir() {
        if (this.operandoU != null) {
            return `${this.operador} ${this.operandoU.traducir()}`;
        }
        else {
            if (this.operando1 != undefined && this.operando2 != undefined) {
                return `${this.operando1.traducir()} ${this.operador} ${this.operando2.traducir()}`;
            }
        }
    }
}
exports.default = Aritmetica;
//# sourceMappingURL=Aritmetica.js.map