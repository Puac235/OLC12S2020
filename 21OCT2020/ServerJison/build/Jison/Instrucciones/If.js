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
class If extends instruccion_1.Instruccion {
    constructor(condicion, instruccionesIf, linea, columna, instruccionesElse) {
        super(new Tipo_1.default(Tipo_1.tipos.ENTERO), linea, columna);
        this.condicion = condicion;
        this.instruccionesIf = instruccionesIf;
        if (instruccionesElse) {
            if (instruccionesElse instanceof instruccion_1.Instruccion) {
                this.elseif = instruccionesElse;
            }
            else {
                this.instruccionesElse = instruccionesElse;
            }
        }
    }
    getNodo() {
        var nodo = new nodoAST_1.default("IF");
        nodo.agregarHijo("if");
        nodo.agregarHijo("(");
        nodo.agregarHijo2(this.condicion.getNodo());
        nodo.agregarHijo(")");
        nodo.agregarHijo("{");
        var cas = new nodoAST_1.default("INSTRUCCIONES IF");
        for (let m of this.instruccionesIf) {
            cas.agregarHijo2(m.getNodo());
        }
        nodo.agregarHijo2(cas);
        nodo.agregarHijo("}");
        if (this.instruccionesElse != undefined) {
            nodo.agregarHijo("ELSE");
            nodo.agregarHijo("{");
            var el = new nodoAST_1.default("INSTRUCCIONES ELSE");
            for (let m of this.instruccionesElse) {
                el.agregarHijo2(m.getNodo());
            }
            nodo.agregarHijo2(el);
            nodo.agregarHijo("}");
        }
        if (this.elseif != undefined) {
            var elif = new nodoAST_1.default("ELSE IF");
            elif.agregarHijo2(this.elseif.getNodo());
            nodo.agregarHijo2(elif);
        }
        return nodo;
    }
    ejecutar(tree) {
        var condicion = this.condicion.ejecutar(tree);
        if (condicion instanceof (Excepcion_1.default))
            return condicion;
        if (this.condicion.tipo.getTipos() != Tipo_1.tipos.BOOLEANO)
            return new Excepcion_1.default("Boolean Exception", "El valor de la condicion debe ser booleano.", this.linea, this.columna);
        if (condicion) {
            for (let insIf of this.instruccionesIf) {
                var instr = insIf.ejecutar(tree);
                if (instr instanceof (Excepcion_1.default))
                    tree.setConsola(`${instr.imprimir()}`);
            }
        }
        else {
            if (this.elseif != undefined) {
                var instr = this.elseif.ejecutar(tree);
                if (instr instanceof (Excepcion_1.default))
                    return instr;
            }
            else if (this.instruccionesElse != undefined) {
                for (let insElse of this.instruccionesElse) {
                    var instr = insElse.ejecutar(tree);
                    if (instr instanceof (Excepcion_1.default))
                        tree.setConsola(`${instr.imprimir()}`);
                }
            }
        }
        return null;
    }
}
exports.default = If;
//# sourceMappingURL=If.js.map