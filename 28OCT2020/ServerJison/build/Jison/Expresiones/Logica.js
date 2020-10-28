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
exports.OperadorLogico = void 0;
const instruccion_1 = require("../Abstract/instruccion");
const Tipo_1 = __importStar(require("../tablaSimbolos/Tipo"));
const Excepcion_1 = __importDefault(require("../Excepciones/Excepcion"));
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class Logica extends instruccion_1.Instruccion {
    constructor(operador, fila, columna, operando1, operando2) {
        super(new Tipo_1.default(Tipo_1.tipos.BOOLEANO), fila, columna);
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
        var nodo = new nodoAST_1.default("LOGICA");
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
    ejecutar(tree, tabla) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var izquierdo = null, derecho = null, unario = null;
        if (this.operandoU == null || this.operandoU == undefined) {
            izquierdo = (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.ejecutar(tree, tabla);
            if (izquierdo instanceof Excepcion_1.default)
                return izquierdo;
            derecho = (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.ejecutar(tree, tabla);
            if (derecho instanceof Excepcion_1.default)
                return derecho;
        }
        else {
            if (this.operando1 != undefined && this.operando2 != undefined) {
                unario = (_c = this.operandoU) === null || _c === void 0 ? void 0 : _c.ejecutar(tree, tabla);
                if (unario instanceof Excepcion_1.default)
                    return unario;
            }
        }
        if (this.operador == OperadorLogico.AND) {
            if ((izquierdo != undefined && izquierdo != null) && (derecho != undefined && derecho != null)) {
                if (((_d = this.operando1) === null || _d === void 0 ? void 0 : _d.tipo.getTipos()) == Tipo_1.tipos.BOOLEANO) {
                    if (((_e = this.operando2) === null || _e === void 0 ? void 0 : _e.tipo.getTipos()) == Tipo_1.tipos.BOOLEANO) //BOOLEAN && BOOLEAN
                     {
                        return izquierdo && derecho;
                    }
                    else {
                        return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para &&", this.linea, this.columna);
                    }
                }
                else {
                    return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para &&", this.linea, this.columna);
                }
            }
        }
        else if (this.operador == OperadorLogico.OR) {
            if ((izquierdo != undefined && izquierdo != null) && (derecho != undefined && derecho != null)) {
                if (((_f = this.operando1) === null || _f === void 0 ? void 0 : _f.tipo.getTipos()) == Tipo_1.tipos.BOOLEANO) {
                    if (((_g = this.operando2) === null || _g === void 0 ? void 0 : _g.tipo.getTipos()) == Tipo_1.tipos.BOOLEANO) //BOOLEAN || BOOLEAN
                     {
                        return izquierdo || derecho;
                    }
                    else {
                        return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para ||", this.linea, this.columna);
                    }
                }
                else {
                    return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para ||", this.linea, this.columna);
                }
            }
        }
        else if (this.operador == OperadorLogico.NOT) {
            if ((unario != undefined && unario != null)) {
                if (((_h = this.operandoU) === null || _h === void 0 ? void 0 : _h.tipo.getTipos()) == Tipo_1.tipos.BOOLEANO) {
                    return !unario;
                }
                else {
                    return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para !", this.linea, this.columna);
                }
            }
        }
        else {
            return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneo.", this.linea, this.columna);
        }
    }
}
exports.default = Logica;
var OperadorLogico;
(function (OperadorLogico) {
    OperadorLogico[OperadorLogico["AND"] = 0] = "AND";
    OperadorLogico[OperadorLogico["OR"] = 1] = "OR";
    OperadorLogico[OperadorLogico["NOT"] = 2] = "NOT";
})(OperadorLogico = exports.OperadorLogico || (exports.OperadorLogico = {}));
//# sourceMappingURL=Logica.js.map