"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class Declaracion extends instruccion_1.Instruccion {
    constructor(tipo, identificador, expresion, linea, columna) {
        super(linea, columna);
        this.tipo = tipo;
        this.identificador = identificador;
        this.expresion = expresion;
    }
    getNodo() {
        var nodo = new nodoAST_1.default("DECLARACION");
        nodo.agregarHijo(this.tipo);
        nodo.agregarHijo(this.identificador);
        nodo.agregarHijo2(this.expresion.getNodo());
        return nodo;
    }
    traducir() {
        var value = this.expresion.traducir();
        return `${this.tipo} ${this.identificador} = ${value} ;\n`;
    }
}
exports.default = Declaracion;
//# sourceMappingURL=Declaracion.js.map