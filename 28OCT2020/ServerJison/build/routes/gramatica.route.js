"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const gramatica_controller_1 = require("../controllers/gramatica.controller");
router.post('/', gramatica_controller_1.gramaticaController.ejecutar);
exports.default = router;
//# sourceMappingURL=gramatica.route.js.map