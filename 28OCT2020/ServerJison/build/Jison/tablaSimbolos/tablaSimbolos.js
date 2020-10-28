"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TablaSimbolos {
    constructor(anterior) {
        this.anterior = anterior;
        this.table = new Map();
    }
    setVariable(simbolo) {
        for (var e = this; e != null; e = e.getAnterior()) {
            var encontro = (e.getTable().get(simbolo.getIdentificador()));
            if (encontro != null) {
                return "La variable con el identificador: " + simbolo.getIdentificador() + " ya existe.";
            }
            break;
        }
        this.table.set(simbolo.getIdentificador(), simbolo);
        return null;
    }
    getVariable(id) {
        for (var e = this; e != null; e = e.getAnterior()) {
            var encontro = (e.getTable().get(id));
            if (encontro != null) {
                return encontro;
            }
        }
        return null;
    }
    getTable() {
        return this.table;
    }
    setTable(Table) {
        this.table = Table;
    }
    getAnterior() {
        return this.anterior;
    }
    setAnterior(Anterior) {
        this.anterior = Anterior;
    }
}
exports.default = TablaSimbolos;
//# sourceMappingURL=tablaSimbolos.js.map