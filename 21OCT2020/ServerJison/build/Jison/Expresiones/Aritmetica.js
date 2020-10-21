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
exports.OperadorAritmetico = void 0;
const instruccion_1 = require("../Abstract/instruccion");
const Tipo_1 = __importStar(require("../tablaSimbolos/Tipo"));
const Excepcion_1 = __importDefault(require("../Excepciones/Excepcion"));
const nodoAST_1 = __importDefault(require("../Abstract/nodoAST"));
class Aritmetica extends instruccion_1.Instruccion {
    constructor(operador, fila, columna, operando1, operando2) {
        super(new Tipo_1.default(Tipo_1.tipos.ENTERO), fila, columna);
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
            nodo.agregarHijo("-");
            nodo.agregarHijo2(this.operandoU.getNodo());
        }
        else {
            if (this.operando1 != undefined && this.operando2 != undefined) {
                nodo.agregarHijo2(this.operando1.getNodo());
                if (this.operador == 0)
                    nodo.agregarHijo("+");
                if (this.operador == 1)
                    nodo.agregarHijo("-");
                if (this.operador == 2)
                    nodo.agregarHijo("*");
                if (this.operador == 3)
                    nodo.agregarHijo("/");
                nodo.agregarHijo2(this.operando2.getNodo());
            }
        }
        return nodo;
    }
    ejecutar(tree) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39;
        var izquierdo = null, derecho = null, unario = null;
        if (this.operandoU == null || this.operandoU == undefined) {
            izquierdo = (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.ejecutar(tree);
            if (izquierdo instanceof Excepcion_1.default)
                return izquierdo;
            derecho = (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.ejecutar(tree);
            if (derecho instanceof Excepcion_1.default)
                return derecho;
        }
        else {
            unario = (_c = this.operandoU) === null || _c === void 0 ? void 0 : _c.ejecutar(tree);
            if (unario instanceof Excepcion_1.default)
                return unario;
        }
        if (this.operador == OperadorAritmetico.SUMA) {
            if ((izquierdo != undefined && izquierdo != null) && (derecho != undefined && derecho != null)) {
                if (((_d = this.operando1) === null || _d === void 0 ? void 0 : _d.tipo.getTipos()) == Tipo_1.tipos.ENTERO) {
                    if (((_e = this.operando2) === null || _e === void 0 ? void 0 : _e.tipo.getTipos()) == Tipo_1.tipos.ENTERO) //INTEGER+INTEGER
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.ENTERO);
                        return Number(izquierdo) + Number(derecho);
                    }
                    else if (((_f = this.operando2) === null || _f === void 0 ? void 0 : _f.tipo.getTipos()) == Tipo_1.tipos.DECIMAL) //INTEGER+DOUBLE
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.DECIMAL);
                        return Number(izquierdo) + Number(derecho);
                    }
                    else if (((_g = this.operando2) === null || _g === void 0 ? void 0 : _g.tipo.getTipos()) == Tipo_1.tipos.CARACTER) //INTEGER+CHAR
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.ENTERO);
                        return Number(izquierdo) + derecho.charCodeAt(0);
                    }
                    else if (((_h = this.operando2) === null || _h === void 0 ? void 0 : _h.tipo.getTipos()) == Tipo_1.tipos.CADENA) //INTEGER+STRING
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.CADENA);
                        return izquierdo + derecho;
                    }
                    else {
                        return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para +", this.linea, this.columna);
                    }
                }
                else if (((_j = this.operando1) === null || _j === void 0 ? void 0 : _j.tipo.getTipos()) == Tipo_1.tipos.DECIMAL) {
                    if (((_k = this.operando2) === null || _k === void 0 ? void 0 : _k.tipo.getTipos()) == Tipo_1.tipos.ENTERO) //DOUBLE+INTEGER
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.DECIMAL);
                        return Number(izquierdo) + Number(derecho);
                    }
                    else if (((_l = this.operando2) === null || _l === void 0 ? void 0 : _l.tipo.getTipos()) == Tipo_1.tipos.DECIMAL) //DOUBLE+DOUBLE
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.DECIMAL);
                        return Number(izquierdo) + Number(derecho);
                    }
                    else if (((_m = this.operando2) === null || _m === void 0 ? void 0 : _m.tipo.getTipos()) == Tipo_1.tipos.CARACTER) //DOUBLE+CHAR
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.DECIMAL);
                        return Number(izquierdo) + derecho.charCodeAt(0);
                    }
                    else if (((_o = this.operando2) === null || _o === void 0 ? void 0 : _o.tipo.getTipos()) == Tipo_1.tipos.CADENA) //DOUBLE+STRING
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.CADENA);
                        return izquierdo + derecho;
                    }
                    else {
                        return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para +", this.linea, this.columna);
                    }
                }
                else if (((_p = this.operando1) === null || _p === void 0 ? void 0 : _p.tipo.getTipos()) == Tipo_1.tipos.CARACTER) {
                    if (((_q = this.operando2) === null || _q === void 0 ? void 0 : _q.tipo.getTipos()) == Tipo_1.tipos.ENTERO) //CHAR+INTEGER
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.ENTERO);
                        return izquierdo.charCodeAt(0) + Number(derecho);
                    }
                    else if (((_r = this.operando2) === null || _r === void 0 ? void 0 : _r.tipo.getTipos()) == Tipo_1.tipos.DECIMAL) //CHAR+DOUBLE
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.DECIMAL);
                        return izquierdo.charCodeAt(0) + Number(derecho);
                    }
                    else if (((_s = this.operando2) === null || _s === void 0 ? void 0 : _s.tipo.getTipos()) == Tipo_1.tipos.CARACTER) //CHAR+CHAR
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.CADENA);
                        return izquierdo + derecho;
                    }
                    else if (((_t = this.operando2) === null || _t === void 0 ? void 0 : _t.tipo.getTipos()) == Tipo_1.tipos.CADENA) //CHAR+STRING
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.CADENA);
                        return izquierdo + derecho;
                    }
                    else {
                        return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para +", this.linea, this.columna);
                    }
                }
                else if (((_u = this.operando1) === null || _u === void 0 ? void 0 : _u.tipo.getTipos()) == Tipo_1.tipos.CADENA) {
                    if (((_v = this.operando2) === null || _v === void 0 ? void 0 : _v.tipo.getTipos()) == Tipo_1.tipos.ENTERO) //STRING+INTEGER
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.CADENA);
                        return izquierdo + derecho;
                    }
                    else if (((_w = this.operando2) === null || _w === void 0 ? void 0 : _w.tipo.getTipos()) == Tipo_1.tipos.DECIMAL) //STRING+DOUBLE
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.CADENA);
                        return izquierdo + derecho;
                    }
                    else if (((_x = this.operando2) === null || _x === void 0 ? void 0 : _x.tipo.getTipos()) == Tipo_1.tipos.CARACTER) //STRING+CHAR
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.CADENA);
                        return izquierdo + derecho;
                    }
                    else if (((_y = this.operando2) === null || _y === void 0 ? void 0 : _y.tipo.getTipos()) == Tipo_1.tipos.BOOLEANO) //STRING+STRING
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.CADENA);
                        return izquierdo + derecho;
                    }
                    else if (((_z = this.operando2) === null || _z === void 0 ? void 0 : _z.tipo.getTipos()) == Tipo_1.tipos.CADENA) //STRING+STRING
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.CADENA);
                        return izquierdo + derecho;
                    }
                    else {
                        return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para +", this.linea, this.columna);
                    }
                }
                else if (((_0 = this.operando1) === null || _0 === void 0 ? void 0 : _0.tipo.getTipos()) == Tipo_1.tipos.BOOLEANO) {
                    if (((_1 = this.operando2) === null || _1 === void 0 ? void 0 : _1.tipo.getTipos()) == Tipo_1.tipos.CADENA) //BOOLEAN+STRING
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.CADENA);
                        return izquierdo + derecho;
                    }
                    else {
                        return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para +", this.linea, this.columna);
                    }
                }
                else {
                    return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para +", this.linea, this.columna);
                }
            }
        }
        else if (this.operador == OperadorAritmetico.RESTA) {
            if ((izquierdo != undefined && izquierdo != null) && (derecho != undefined && derecho != null)) {
                if (((_2 = this.operando1) === null || _2 === void 0 ? void 0 : _2.tipo.getTipos()) == Tipo_1.tipos.ENTERO) {
                    if (((_3 = this.operando2) === null || _3 === void 0 ? void 0 : _3.tipo.getTipos()) == Tipo_1.tipos.ENTERO) //INTEGER-INTEGER
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.ENTERO);
                        return Number(izquierdo) - Number(derecho);
                    }
                    else if (((_4 = this.operando2) === null || _4 === void 0 ? void 0 : _4.tipo.getTipos()) == Tipo_1.tipos.DECIMAL) //INTEGER-DOUBLE
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.DECIMAL);
                        return Number(izquierdo) - Number(derecho);
                    }
                    else if (((_5 = this.operando2) === null || _5 === void 0 ? void 0 : _5.tipo.getTipos()) == Tipo_1.tipos.CARACTER) //INTEGER-CHAR
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.ENTERO);
                        return Number(izquierdo) - derecho.charCodeAt(0);
                    }
                    else {
                        return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para -", this.linea, this.columna);
                    }
                }
                else if (((_6 = this.operando1) === null || _6 === void 0 ? void 0 : _6.tipo.getTipos()) == Tipo_1.tipos.DECIMAL) {
                    if (((_7 = this.operando2) === null || _7 === void 0 ? void 0 : _7.tipo.getTipos()) == Tipo_1.tipos.ENTERO) //DOUBLE-INTEGER
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.DECIMAL);
                        return Number(izquierdo) - Number(derecho);
                    }
                    else if (((_8 = this.operando2) === null || _8 === void 0 ? void 0 : _8.tipo.getTipos()) == Tipo_1.tipos.DECIMAL) //DOUBLE-DOUBLE
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.DECIMAL);
                        return Number(izquierdo) - Number(derecho);
                    }
                    else if (((_9 = this.operando2) === null || _9 === void 0 ? void 0 : _9.tipo.getTipos()) == Tipo_1.tipos.CARACTER) //DOUBLE-CHAR
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.DECIMAL);
                        return Number(izquierdo) - derecho.charCodeAt(0);
                    }
                    else {
                        return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para -", this.linea, this.columna);
                    }
                }
                else if (((_10 = this.operando1) === null || _10 === void 0 ? void 0 : _10.tipo.getTipos()) == Tipo_1.tipos.CARACTER) {
                    if (((_11 = this.operando2) === null || _11 === void 0 ? void 0 : _11.tipo.getTipos()) == Tipo_1.tipos.ENTERO) //CHAR-INTEGER
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.ENTERO);
                        return izquierdo.charCodeAt(0) - Number(derecho);
                    }
                    else if (((_12 = this.operando2) === null || _12 === void 0 ? void 0 : _12.tipo.getTipos()) == Tipo_1.tipos.DECIMAL) //CHAR-DOUBLE
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.DECIMAL);
                        return izquierdo.charCodeAt(0) - Number(derecho);
                    }
                    else if (((_13 = this.operando2) === null || _13 === void 0 ? void 0 : _13.tipo.getTipos()) == Tipo_1.tipos.CARACTER) //CHAR-CHAR
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.ENTERO);
                        return izquierdo.charCodeAt(0) - derecho.charCodeAt(0);
                    }
                    else {
                        return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para -", this.linea, this.columna);
                    }
                }
                else {
                    return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para -", this.linea, this.columna);
                }
            }
        }
        else if (this.operador == OperadorAritmetico.MULTIPLICACION) {
            if ((izquierdo != undefined && izquierdo != null) && (derecho != undefined && derecho != null)) {
                if (((_14 = this.operando1) === null || _14 === void 0 ? void 0 : _14.tipo.getTipos()) == Tipo_1.tipos.ENTERO) {
                    if (((_15 = this.operando2) === null || _15 === void 0 ? void 0 : _15.tipo.getTipos()) == Tipo_1.tipos.ENTERO) //INTEGER*INTEGER
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.ENTERO);
                        return Number(izquierdo) * Number(derecho);
                    }
                    else if (((_16 = this.operando2) === null || _16 === void 0 ? void 0 : _16.tipo.getTipos()) == Tipo_1.tipos.DECIMAL) //INTEGER*DOUBLE
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.DECIMAL);
                        return Number(izquierdo) * Number(derecho);
                    }
                    else if (((_17 = this.operando2) === null || _17 === void 0 ? void 0 : _17.tipo.getTipos()) == Tipo_1.tipos.CARACTER) //INTEGER*CHAR
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.ENTERO);
                        return Number(izquierdo) * derecho.charCodeAt(0);
                    }
                    else {
                        return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para *", this.linea, this.columna);
                    }
                }
                else if (((_18 = this.operando1) === null || _18 === void 0 ? void 0 : _18.tipo.getTipos()) == Tipo_1.tipos.DECIMAL) {
                    if (((_19 = this.operando2) === null || _19 === void 0 ? void 0 : _19.tipo.getTipos()) == Tipo_1.tipos.ENTERO) //DOUBLE*INTEGER
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.DECIMAL);
                        return Number(izquierdo) * Number(derecho);
                    }
                    else if (((_20 = this.operando2) === null || _20 === void 0 ? void 0 : _20.tipo.getTipos()) == Tipo_1.tipos.DECIMAL) //DOUBLE*DOUBLE
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.DECIMAL);
                        return Number(izquierdo) * Number(derecho);
                    }
                    else if (((_21 = this.operando2) === null || _21 === void 0 ? void 0 : _21.tipo.getTipos()) == Tipo_1.tipos.CARACTER) //DOUBLE*CHAR
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.DECIMAL);
                        return Number(izquierdo) * derecho.charCodeAt(0);
                    }
                    else {
                        return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para *", this.linea, this.columna);
                    }
                }
                else if (((_22 = this.operando1) === null || _22 === void 0 ? void 0 : _22.tipo.getTipos()) == Tipo_1.tipos.CARACTER) {
                    if (((_23 = this.operando2) === null || _23 === void 0 ? void 0 : _23.tipo.getTipos()) == Tipo_1.tipos.ENTERO) //CHAR*INTEGER
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.ENTERO);
                        return izquierdo.charCodeAt(0) * Number(derecho);
                    }
                    else if (((_24 = this.operando2) === null || _24 === void 0 ? void 0 : _24.tipo.getTipos()) == Tipo_1.tipos.DECIMAL) //CHAR*DOUBLE
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.DECIMAL);
                        return izquierdo.charCodeAt(0) * Number(derecho);
                    }
                    else if (((_25 = this.operando2) === null || _25 === void 0 ? void 0 : _25.tipo.getTipos()) == Tipo_1.tipos.CARACTER) //CHAR*CHAR
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.ENTERO);
                        return izquierdo.charCodeAt(0) * derecho.charCodeAt(0);
                    }
                    else {
                        return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para *", this.linea, this.columna);
                    }
                }
                else {
                    return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para *", this.linea, this.columna);
                }
            }
        }
        else if (this.operador == OperadorAritmetico.DIVISION) {
            if ((izquierdo != undefined && izquierdo != null) && (derecho != undefined && derecho != null)) {
                if (((_26 = this.operando1) === null || _26 === void 0 ? void 0 : _26.tipo.getTipos()) == Tipo_1.tipos.ENTERO) {
                    if (((_27 = this.operando2) === null || _27 === void 0 ? void 0 : _27.tipo.getTipos()) == Tipo_1.tipos.ENTERO) //INTEGER/INTEGER
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.ENTERO);
                        if (Number(derecho) == 0) {
                            return new Excepcion_1.default("Arithmetic Exception", "No se puede dividir entre 0", this.linea, this.columna);
                        }
                        return Number(izquierdo) / Number(derecho);
                    }
                    else if (((_28 = this.operando2) === null || _28 === void 0 ? void 0 : _28.tipo.getTipos()) == Tipo_1.tipos.DECIMAL) //INTEGER/DOUBLE
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.DECIMAL);
                        if (Number(derecho) == 0) {
                            return new Excepcion_1.default("Arithmetic Exception", "No se puede dividir entre 0", this.linea, this.columna);
                        }
                        return Number(izquierdo) / Number(derecho);
                    }
                    else if (((_29 = this.operando2) === null || _29 === void 0 ? void 0 : _29.tipo.getTipos()) == Tipo_1.tipos.CARACTER) //INTEGER/CHAR
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.ENTERO);
                        if (derecho.charCodeAt(0) == 0) {
                            return new Excepcion_1.default("Arithmetic Exception", "No se puede dividir entre 0", this.linea, this.columna);
                        }
                        return Number(izquierdo) / derecho.charCodeAt(0);
                    }
                    else {
                        return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para /", this.linea, this.columna);
                    }
                }
                else if (((_30 = this.operando1) === null || _30 === void 0 ? void 0 : _30.tipo.getTipos()) == Tipo_1.tipos.DECIMAL) {
                    if (((_31 = this.operando2) === null || _31 === void 0 ? void 0 : _31.tipo.getTipos()) == Tipo_1.tipos.ENTERO) //DOUBLE/INTEGER
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.DECIMAL);
                        if (Number(derecho) == 0) {
                            return new Excepcion_1.default("Arithmetic Exception", "No se puede dividir entre 0", this.linea, this.columna);
                        }
                        return Number(izquierdo) / Number(derecho);
                    }
                    else if (((_32 = this.operando2) === null || _32 === void 0 ? void 0 : _32.tipo.getTipos()) == Tipo_1.tipos.DECIMAL) //DOUBLE/DOUBLE
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.DECIMAL);
                        if (Number(derecho) == 0) {
                            return new Excepcion_1.default("Arithmetic Exception", "No se puede dividir entre 0", this.linea, this.columna);
                        }
                        return Number(izquierdo) / Number(derecho);
                    }
                    else if (((_33 = this.operando2) === null || _33 === void 0 ? void 0 : _33.tipo.getTipos()) == Tipo_1.tipos.CARACTER) //DOUBLE/CHAR
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.DECIMAL);
                        if (derecho.charCodeAt(0) == 0) {
                            return new Excepcion_1.default("Arithmetic Exception", "No se puede dividir entre 0", this.linea, this.columna);
                        }
                        return Number(izquierdo) / derecho.charCodeAt(0);
                    }
                    else {
                        return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para /", this.linea, this.columna);
                    }
                }
                else if (((_34 = this.operando1) === null || _34 === void 0 ? void 0 : _34.tipo.getTipos()) == Tipo_1.tipos.CARACTER) {
                    if (((_35 = this.operando2) === null || _35 === void 0 ? void 0 : _35.tipo.getTipos()) == Tipo_1.tipos.ENTERO) //CHAR/INTEGER
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.ENTERO);
                        if (Number(derecho) == 0) {
                            return new Excepcion_1.default("Arithmetic Exception", "No se puede dividir entre 0", this.linea, this.columna);
                        }
                        return izquierdo.charCodeAt(0) / Number(derecho);
                    }
                    else if (((_36 = this.operando2) === null || _36 === void 0 ? void 0 : _36.tipo.getTipos()) == Tipo_1.tipos.DECIMAL) //CHAR/DOUBLE
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.DECIMAL);
                        if (Number(derecho) == 0) {
                            return new Excepcion_1.default("Arithmetic Exception", "No se puede dividir entre 0", this.linea, this.columna);
                        }
                        return izquierdo.charCodeAt(0) / Number(derecho);
                    }
                    else if (((_37 = this.operando2) === null || _37 === void 0 ? void 0 : _37.tipo.getTipos()) == Tipo_1.tipos.CARACTER) //CHAR/CHAR
                     {
                        this.tipo = new Tipo_1.default(Tipo_1.tipos.ENTERO);
                        if (derecho.charCodeAt(0) == 0) {
                            return new Excepcion_1.default("Arithmetic Exception", "No se puede dividir entre 0", this.linea, this.columna);
                        }
                        return izquierdo.charCodeAt(0) / derecho.charCodeAt(0);
                    }
                    else {
                        return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para /", this.linea, this.columna);
                    }
                }
                else {
                    return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para /", this.linea, this.columna);
                }
            }
        }
        else if (this.operador == OperadorAritmetico.MENOSUNARIO) {
            if ((unario != undefined && unario != null)) {
                if (((_38 = this.operandoU) === null || _38 === void 0 ? void 0 : _38.tipo.getTipos()) == Tipo_1.tipos.ENTERO) {
                    this.tipo = new Tipo_1.default(Tipo_1.tipos.ENTERO);
                    return Number(unario) * -1;
                }
                else if (((_39 = this.operandoU) === null || _39 === void 0 ? void 0 : _39.tipo.getTipos()) == Tipo_1.tipos.DECIMAL) {
                    this.tipo = new Tipo_1.default(Tipo_1.tipos.DECIMAL);
                    return Number(unario) * -1;
                }
                else {
                    return new Excepcion_1.default("Arithmetic Exception", "Operandos erroneos para - unario", this.linea, this.columna);
                }
            }
        }
        else {
            return new Excepcion_1.default("Semántico", "Tipo de Operación Erróneo.", this.linea, this.columna);
        }
    }
}
exports.default = Aritmetica;
var OperadorAritmetico;
(function (OperadorAritmetico) {
    OperadorAritmetico[OperadorAritmetico["SUMA"] = 0] = "SUMA";
    OperadorAritmetico[OperadorAritmetico["RESTA"] = 1] = "RESTA";
    OperadorAritmetico[OperadorAritmetico["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    OperadorAritmetico[OperadorAritmetico["DIVISION"] = 3] = "DIVISION";
    OperadorAritmetico[OperadorAritmetico["MENOSUNARIO"] = 4] = "MENOSUNARIO";
})(OperadorAritmetico = exports.OperadorAritmetico || (exports.OperadorAritmetico = {}));
//# sourceMappingURL=Aritmetica.js.map