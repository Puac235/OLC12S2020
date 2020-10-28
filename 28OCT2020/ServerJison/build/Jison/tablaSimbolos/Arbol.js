"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tablaSimbolos_1 = __importDefault(require("./tablaSimbolos"));
class Arbol {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.excepciones = new Array();
        this.consola = "";
        this.global = new tablaSimbolos_1.default();
    }
    getInstrucciones() {
        return this.instrucciones;
    }
    setInstrucciones(instrucciones) {
        this.instrucciones = instrucciones;
    }
    getExcepciones() {
        return this.excepciones;
    }
    setExcepciones(excepciones) {
        this.excepciones = excepciones;
    }
    getConsola() {
        return this.consola;
    }
    setConsola(consola) {
        this.consola = `${this.getConsola()}${consola}`;
    }
    getGlobal() {
        return this.global;
    }
    setGlobal(global) {
        this.global = global;
    }
}
exports.default = Arbol;
//# sourceMappingURL=Arbol.js.map