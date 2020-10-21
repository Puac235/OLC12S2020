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
exports.OperadorRelacional = void 0;
const instruccion_1 = require("../Abstract/instruccion");
const Tipo_1 = __importStar(require("../tablaSimbolos/Tipo"));
const Excepcion_1 = __importDefault(require("../Excepciones/Excepcion"));
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class Relacional extends instruccion_1.Instruccion {
    constructor(operando1, operando2, operador, fila, columna) {
        super(new Tipo_1.default(Tipo_1.tipos.BOOLEANO), fila, columna);
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
    ejecutar(tree) {
        var _a, _b, _c, _d, _e, _f;
        var izquierdo = null, derecho = null;
        izquierdo = this.operando1.ejecutar(tree);
        if (izquierdo instanceof Excepcion_1.default)
            return izquierdo;
        derecho = this.operando2.ejecutar(tree);
        if (derecho instanceof Excepcion_1.default)
            return derecho;
        this.tipo = new Tipo_1.default(Tipo_1.tipos.BOOLEANO);
        if (this.operador == OperadorRelacional.MENORQUE) {
            if (this.operando1.tipo.getTipos() == Tipo_1.tipos.ENTERO) {
                if (this.operando2.tipo.getTipos() == Tipo_1.tipos.ENTERO) {
                    return Number(izquierdo) < Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.DECIMAL) {
                    return Number(izquierdo) < Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.CARACTER) {
                    return Number(izquierdo) < derecho.charCodeAt(0);
                }
                else {
                    return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para <", this.linea, this.columna);
                }
            }
            else if (this.operando1.tipo.getTipos() == Tipo_1.tipos.DECIMAL) {
                if (this.operando2.tipo.getTipos() == Tipo_1.tipos.ENTERO) {
                    return Number(izquierdo) < Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.DECIMAL) {
                    return Number(izquierdo) < Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.CARACTER) {
                    return Number(izquierdo) < derecho.charCodeAt(0);
                }
                else {
                    return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para <", this.linea, this.columna);
                }
            }
            else if (((_a = this.operando1) === null || _a === void 0 ? void 0 : _a.tipo.getTipos()) == Tipo_1.tipos.CARACTER) {
                if (this.operando2.tipo.getTipos() == Tipo_1.tipos.ENTERO) {
                    return izquierdo.charCodeAt(0) < Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.DECIMAL) {
                    return Number(izquierdo) < Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.CARACTER) {
                    return izquierdo.charCodeAt(0) < derecho.charCodeAt(0);
                }
                else {
                    return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para <", this.linea, this.columna);
                }
            }
            else {
                return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para <", this.linea, this.columna);
            }
        }
        else if (this.operador == OperadorRelacional.MAYORQUE) {
            if (this.operando1.tipo.getTipos() == Tipo_1.tipos.ENTERO) {
                if (this.operando2.tipo.getTipos() == Tipo_1.tipos.ENTERO) {
                    return Number(izquierdo) > Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.DECIMAL) {
                    return Number(izquierdo) > Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.CARACTER) {
                    return Number(izquierdo) > derecho.charCodeAt(0);
                }
                else {
                    return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para >", this.linea, this.columna);
                }
            }
            else if (this.operando1.tipo.getTipos() == Tipo_1.tipos.DECIMAL) {
                if (this.operando2.tipo.getTipos() == Tipo_1.tipos.ENTERO) {
                    return Number(izquierdo) > Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.DECIMAL) {
                    return Number(izquierdo) > Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.CARACTER) {
                    return Number(izquierdo) > derecho.charCodeAt(0);
                }
                else {
                    return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para >", this.linea, this.columna);
                }
            }
            else if (((_b = this.operando1) === null || _b === void 0 ? void 0 : _b.tipo.getTipos()) == Tipo_1.tipos.CARACTER) {
                if (this.operando2.tipo.getTipos() == Tipo_1.tipos.ENTERO) {
                    return izquierdo.charCodeAt(0) > Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.DECIMAL) {
                    return Number(izquierdo) > Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.CARACTER) {
                    return izquierdo.charCodeAt(0) > derecho.charCodeAt(0);
                }
                else {
                    return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para >", this.linea, this.columna);
                }
            }
            else {
                return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para >", this.linea, this.columna);
            }
        }
        else if (this.operador == OperadorRelacional.MENORIGUAL) {
            if (this.operando1.tipo.getTipos() == Tipo_1.tipos.ENTERO) {
                if (this.operando2.tipo.getTipos() == Tipo_1.tipos.ENTERO) {
                    return Number(izquierdo) <= Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.DECIMAL) {
                    return Number(izquierdo) <= Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.CARACTER) {
                    return Number(izquierdo) <= derecho.charCodeAt(0);
                }
                else {
                    return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para <=", this.linea, this.columna);
                }
            }
            else if (this.operando1.tipo.getTipos() == Tipo_1.tipos.DECIMAL) {
                if (this.operando2.tipo.getTipos() == Tipo_1.tipos.ENTERO) {
                    return Number(izquierdo) <= Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.DECIMAL) {
                    return Number(izquierdo) <= Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.CARACTER) {
                    return Number(izquierdo) <= derecho.charCodeAt(0);
                }
                else {
                    return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para <=", this.linea, this.columna);
                }
            }
            else if (((_c = this.operando1) === null || _c === void 0 ? void 0 : _c.tipo.getTipos()) == Tipo_1.tipos.CARACTER) {
                if (this.operando2.tipo.getTipos() == Tipo_1.tipos.ENTERO) {
                    return izquierdo.charCodeAt(0) <= Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.DECIMAL) {
                    return Number(izquierdo) <= Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.CARACTER) {
                    return izquierdo.charCodeAt(0) <= derecho.charCodeAt(0);
                }
                else {
                    return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para <=", this.linea, this.columna);
                }
            }
            else {
                return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para <=", this.linea, this.columna);
            }
        }
        else if (this.operador == OperadorRelacional.MAYORIGUAL) {
            if (this.operando1.tipo.getTipos() == Tipo_1.tipos.ENTERO) {
                if (this.operando2.tipo.getTipos() == Tipo_1.tipos.ENTERO) {
                    return Number(izquierdo) >= Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.DECIMAL) {
                    return Number(izquierdo) >= Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.CARACTER) {
                    return Number(izquierdo) >= derecho.charCodeAt(0);
                }
                else {
                    return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para >=", this.linea, this.columna);
                }
            }
            else if (this.operando1.tipo.getTipos() == Tipo_1.tipos.DECIMAL) {
                if (this.operando2.tipo.getTipos() == Tipo_1.tipos.ENTERO) {
                    return Number(izquierdo) >= Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.DECIMAL) {
                    return Number(izquierdo) >= Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.CARACTER) {
                    return Number(izquierdo) >= derecho.charCodeAt(0);
                }
                else {
                    return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para >=", this.linea, this.columna);
                }
            }
            else if (((_d = this.operando1) === null || _d === void 0 ? void 0 : _d.tipo.getTipos()) == Tipo_1.tipos.CARACTER) {
                if (this.operando2.tipo.getTipos() == Tipo_1.tipos.ENTERO) {
                    return izquierdo.charCodeAt(0) >= Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.DECIMAL) {
                    return Number(izquierdo) >= Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.CARACTER) {
                    return izquierdo.charCodeAt(0) >= derecho.charCodeAt(0);
                }
                else {
                    return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para >=", this.linea, this.columna);
                }
            }
            else {
                return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para >=", this.linea, this.columna);
            }
        }
        else if (this.operador == OperadorRelacional.IGUALACION) {
            if (this.operando1.tipo.getTipos() == Tipo_1.tipos.ENTERO) {
                if (this.operando2.tipo.getTipos() == Tipo_1.tipos.ENTERO) {
                    return Number(izquierdo) == Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.DECIMAL) {
                    return Number(izquierdo) == Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.CARACTER) {
                    return Number(izquierdo) == derecho.charCodeAt(0);
                }
                else {
                    return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para ==", this.linea, this.columna);
                }
            }
            else if (this.operando1.tipo.getTipos() == Tipo_1.tipos.DECIMAL) {
                if (this.operando2.tipo.getTipos() == Tipo_1.tipos.ENTERO) {
                    return Number(izquierdo) == Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.DECIMAL) {
                    return Number(izquierdo) == Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.CARACTER) {
                    return Number(izquierdo) == derecho.charCodeAt(0);
                }
                else {
                    return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para ==", this.linea, this.columna);
                }
            }
            else if (((_e = this.operando1) === null || _e === void 0 ? void 0 : _e.tipo.getTipos()) == Tipo_1.tipos.CARACTER) {
                if (this.operando2.tipo.getTipos() == Tipo_1.tipos.ENTERO) {
                    return izquierdo.charCodeAt(0) == Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.DECIMAL) {
                    return Number(izquierdo) == Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.CARACTER) {
                    return izquierdo.charCodeAt(0) == derecho.charCodeAt(0);
                }
                else {
                    return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para ==", this.linea, this.columna);
                }
            }
            else {
                return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para ==", this.linea, this.columna);
            }
        }
        else if (this.operador == OperadorRelacional.DIFERENCIACION) {
            if (this.operando1.tipo.getTipos() == Tipo_1.tipos.ENTERO) {
                if (this.operando2.tipo.getTipos() == Tipo_1.tipos.ENTERO) {
                    return Number(izquierdo) != Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.DECIMAL) {
                    return Number(izquierdo) != Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.CARACTER) {
                    return Number(izquierdo) != derecho.charCodeAt(0);
                }
                else {
                    return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para !=", this.linea, this.columna);
                }
            }
            else if (this.operando1.tipo.getTipos() == Tipo_1.tipos.DECIMAL) {
                if (this.operando2.tipo.getTipos() == Tipo_1.tipos.ENTERO) {
                    return Number(izquierdo) != Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.DECIMAL) {
                    return Number(izquierdo) != Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.CARACTER) {
                    return Number(izquierdo) != derecho.charCodeAt(0);
                }
                else {
                    return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para !=", this.linea, this.columna);
                }
            }
            else if (((_f = this.operando1) === null || _f === void 0 ? void 0 : _f.tipo.getTipos()) == Tipo_1.tipos.CARACTER) {
                if (this.operando2.tipo.getTipos() == Tipo_1.tipos.ENTERO) {
                    return izquierdo.charCodeAt(0) != Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.DECIMAL) {
                    return Number(izquierdo) != Number(derecho);
                }
                else if (this.operando2.tipo.getTipos() == Tipo_1.tipos.CARACTER) {
                    return izquierdo.charCodeAt(0) != derecho.charCodeAt(0);
                }
                else {
                    return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para !=", this.linea, this.columna);
                }
            }
            else {
                return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para !=", this.linea, this.columna);
            }
        }
        else {
            return new Excepcion_1.default("Semántico", "Tipo de Operación Erróneo.", this.linea, this.columna);
        }
    }
}
exports.default = Relacional;
var OperadorRelacional;
(function (OperadorRelacional) {
    OperadorRelacional[OperadorRelacional["MAYORQUE"] = 0] = "MAYORQUE";
    OperadorRelacional[OperadorRelacional["MENORQUE"] = 1] = "MENORQUE";
    OperadorRelacional[OperadorRelacional["MAYORIGUAL"] = 2] = "MAYORIGUAL";
    OperadorRelacional[OperadorRelacional["MENORIGUAL"] = 3] = "MENORIGUAL";
    OperadorRelacional[OperadorRelacional["IGUALACION"] = 4] = "IGUALACION";
    OperadorRelacional[OperadorRelacional["DIFERENCIACION"] = 5] = "DIFERENCIACION";
})(OperadorRelacional = exports.OperadorRelacional || (exports.OperadorRelacional = {}));
//# sourceMappingURL=Relacional.js.map