"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gramaticaController = void 0;
const Arbol_1 = __importDefault(require("../Jison/tablaSimbolos/Arbol"));
const Excepcion_1 = __importDefault(require("../Jison/Excepciones/Excepcion"));
const nodoAST_1 = __importDefault(require("../Jison/Abstract/nodoAST"));
class gramaticacontroller {
    ejecutar(req, res) {
        var parser = require('../Jison/gramatica');
        const entrada = req.body.entrada;
        try {
            let ast = new Arbol_1.default(parser.parse(entrada));
            for (let instruccion of ast.getInstrucciones()) {
                var m = instruccion.ejecutar(ast);
                if (m instanceof (Excepcion_1.default))
                    ast.setConsola(`${m.imprimir()}`);
            }
            var salida = ast.getConsola();
            //GENERAR ARBOL
            var fs = require('fs');
            var init = new nodoAST_1.default("RAIZ");
            var instr = new nodoAST_1.default("INSTRUCCIONES");
            for (let instruccion of ast.getInstrucciones()) {
                instr.agregarHijo2(instruccion.getNodo());
            }
            init.agregarHijo2(instr); //AST
            var grafo = '';
            grafo = getDot(init);
            fs.writeFileSync('./ast.dot', grafo);
            fs.writeFileSync('ast.dot', grafo);
            //"dot -T pdf -o ast.pdf ast.dot"
            var exec = require('child_process').exec, child;
            child = exec('dot -T pdf -o ast.pdf ast.dot', function (error, stdout, stderr) {
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
            });
            res.send({
                traduccion: salida,
                arbol: grafo
            });
        }
        catch (err) {
            console.log(err);
            res.send({
                error: err,
            });
        }
    }
}
var dot = '';
var c = 0;
function getDot(raiz) {
    dot = "";
    dot += "digraph {\n";
    dot += "n0[label=\"" + raiz.getValor().replace("\"", "\\\"") + "\"];\n";
    c = 1;
    recorrerAST("n0", raiz);
    dot += "}";
    return dot;
}
function recorrerAST(padre, nPadre) {
    for (let hijo of nPadre.getHijos()) {
        var nombreHijo = "n" + c;
        dot += nombreHijo + "[label=\"" + hijo.getValor().replace("\"", "\\\"") + "\"];\n";
        dot += padre + "->" + nombreHijo + ";\n";
        c++;
        recorrerAST(nombreHijo, hijo);
    }
}
exports.gramaticaController = new gramaticacontroller();
//# sourceMappingURL=gramatica.controller.js.map