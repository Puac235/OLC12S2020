"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const gramatica_route_1 = __importDefault(require("./routes/gramatica.route"));
const app = express_1.default();
app.set('port', process.env.PORT || 3000);
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use(cors_1.default());
app.use('/jison', gramatica_route_1.default);
app.get('**', (req, res) => {
    res.send("Servidor Jison");
});
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
//# sourceMappingURL=index.js.map