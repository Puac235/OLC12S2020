"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
const Excepcion_1 = __importDefault(require("../Excepciones/Excepcion"));
const Simbolo_1 = __importDefault(require("../tablaSimbolos/Simbolo"));
class Declaracion extends instruccion_1.Instruccion {
    constructor(tipo, identificador, expresion, linea, columna) {
        super(tipo, linea, columna);
        this.identificador = identificador;
        this.expresion = expresion;
    }
    getNodo() {
        var nodo = new nodoAST_1.default("DECLARACION");
        nodo.agregarHijo(this.tipo + "");
        nodo.agregarHijo(this.identificador);
        nodo.agregarHijo2(this.expresion.getNodo());
        return nodo;
    }
    ejecutar(tree, tabla) {
        var value = this.expresion.ejecutar(tree, tabla);
        if (value instanceof (Excepcion_1.default))
            return value;
        if (this.expresion.tipo.getTipos() != this.tipo.getTipos())
            return new Excepcion_1.default("Type Exception", "El tipo debe de ser el mismo.", this.linea, this.columna);
        var simbolo = new Simbolo_1.default(this.tipo, this.identificador, value);
        if (tabla.setVariable(simbolo) != null)
            return new Excepcion_1.default("Declaration Exception", `La variable con el identificador: ${this.identificador} ya existe.`, this.linea, this.columna);
        return null;
    }
}
exports.default = Declaracion;
//# sourceMappingURL=Declaracion.js.map