"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Arbol {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.excepciones = new Array();
        this.consola = "";
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
}
exports.default = Arbol;
//# sourceMappingURL=Arbol.js.map