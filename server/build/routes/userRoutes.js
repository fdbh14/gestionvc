"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
//import { TokenValidation } from '../libs/verifyToken';
//import { checkRole} from '../libs/role';
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', userController_1.default.list);
        this.router.get('/:id', userController_1.default.getOne);
        this.router.post('/', userController_1.default.create);
        this.router.put('/:id', userController_1.default.update);
        this.router.delete('/:id', userController_1.default.delete);
        //this.router.get('/', (req,res)=>res.send('Usuarios'));
    }
}
const usersRoutes = new UserRoutes();
exports.default = usersRoutes.router;
//# sourceMappingURL=userRoutes.js.map