"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const Tipo_1 = __importStar(require("../tablaSimbolos/Tipo"));
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
const Excepcion_1 = __importDefault(require("../Excepciones/Excepcion"));
const tablaSimbolos_1 = __importDefault(require("../tablaSimbolos/tablaSimbolos"));
class While extends instruccion_1.Instruccion {
    constructor(condicion, instrucciones, linea, columna) {
        super(new Tipo_1.default(Tipo_1.tipos.ENTERO), linea, columna);
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
            if (m instanceof Excepcion_1.default)
                continue;
            cas.agregarHijo2(m.getNodo());
        }
        nodo.agregarHijo2(cas);
        nodo.agregarHijo("}");
        return nodo;
    }
    ejecutar(tree, tabla) {
        while (true) {
            var condicion = this.condicion.ejecutar(tree, tabla);
            if (condicion instanceof (Excepcion_1.default))
                return condicion;
            if (this.condicion.tipo.getTipos() != Tipo_1.tipos.BOOLEANO)
                return new Excepcion_1.default("Boolean Exception", "El valor de la condicion debe ser booleano.", this.linea, this.columna);
            if (condicion) {
                var nuevaTabla = new tablaSimbolos_1.default(tabla);
                for (let insWhile of this.instrucciones) {
                    if (insWhile instanceof Excepcion_1.default) {
                        tree.setConsola(`${insWhile.imprimir()}`);
                        continue;
                    }
                    var instr = insWhile.ejecutar(tree, nuevaTabla);
                    if (instr instanceof (Excepcion_1.default))
                        tree.setConsola(`${instr.imprimir()}`);
                }
            }
            else {
                break;
            }
        }
        return null;
    }
}
exports.default = While;
//# sourceMappingURL=While.js.map