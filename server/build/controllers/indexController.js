"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
class IndexController {
    index(req, res) {
        res.json({ text: 'La API User esta en: /api/user y la Autenticacion en /api/auth' });
    }
}
exports.indexController = new IndexController();
//# sourceMappingURL=indexController.js.map