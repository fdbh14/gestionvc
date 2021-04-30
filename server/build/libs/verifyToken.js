"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("./config"));
const TokenValidation = (req, res, next) => {
    try {
        const token = req.header('auth-token');
        if (!token)
            return res.status(401).json('Acceso Denegado');
        const payload = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret || 'tokentest');
        req.userId = payload._id;
        console.log(payload._id);
        next();
    }
    catch (e) {
        res.status(400).send('Token Incorrecto');
    }
};
exports.TokenValidation = TokenValidation;
//# sourceMappingURL=verifyToken.js.map