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
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
const Tipo_1 = __importStar(require("../tablaSimbolos/Tipo"));
const Excepcion_1 = __importDefault(require("../Excepciones/Excepcion"));
class Identificador extends instruccion_1.Instruccion {
    constructor(identificador, fila, columna) {
        super(new Tipo_1.default(Tipo_1.tipos.ENTERO), fila, columna);
        this.identificador = identificador;
    }
    getNodo() {
        var nodo = new nodoAST_1.default("IDENTIFICADOR");
        nodo.agregarHijo(this.identificador);
        return nodo;
    }
    ejecutar(tree, tabla) {
        var simbolo = tabla.getVariable(this.identificador);
        if (simbolo == null) {
            return new Excepcion_1.default("Semantico", "Variable " + this.identificador + " no definida.", this.linea, this.columna);
        }
        this.tipo = simbolo.getTipo();
        return simbolo.getValor();
    }
}
exports.default = Identificador;
//# sourceMappingURL=Identificador.js.map