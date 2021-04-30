"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
const verifyToken_1 = require("../libs/verifyToken");
class AuthRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/registro', authController_1.default.createUser);
        this.router.post('/login', authController_1.default.loginUser);
        this.router.get('/profile', verifyToken_1.TokenValidation, authController_1.default.profile);
        //this.router.get('/', (req,res)=>res.send('Hello Auth'));
    }
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
//# sourceMappingURL=authRoutes.js.map