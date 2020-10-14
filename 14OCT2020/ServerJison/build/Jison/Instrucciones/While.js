"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class While extends instruccion_1.Instruccion {
    constructor(condicion, instrucciones, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }
    getNodo() {
        var nodo = new nodoAST_1.default("WHILE");
        nodo.agregarHijo("while");
        nodo.agregarHijo("(");
        nodo.agregarHijo2(this.condicion.getNodo());
        nodo.agregarHijo(")");
        nodo.agregarHijo("{");
        var cas = new nodoAST_1.default("INSTRUCCIONES");
        for (let m of this.instrucciones) {
            cas.agregarHijo2(m.getNodo());
        }
        nodo.agregarHijo2(cas);
        nodo.agregarHijo("}");
        return nodo;
    }
    traducir() {
        var condicion = this.condicion.traducir();
        var instrucciones = '';
        for (let instr of this.instrucciones) {
            instrucciones += instr.traducir();
        }
        return `mientras ( ${condicion} ) {\n${instrucciones}}\n`;
    }
}
exports.default = While;
//# sourceMappingURL=While.js.map