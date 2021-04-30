"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import bcrypt from 'bcryptjs';
const database_1 = __importDefault(require("../database"));
//import { text } from 'body-parser';
const md5_typescript_1 = require("md5-typescript");
class UserController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = database_1.default.query('SELECT * FROM virtual_users', function (err, user, fields) {
                    if (user.length > 0) {
                        res.json(user);
                    }
                    else {
                        res.status(404).json({ message: "No hay usuarios" });
                    }
                });
            }
            catch (err) {
                throw err;
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params; //Obtengo el id del juego a actualizar
            try {
                const user = yield database_1.default.query('SELECT * FROM virtual_users WHERE id = ?', [id], function (err, user, fields) {
                    if (user.length > 0) { //Si la longitud del arreglo games es > 0, o sea hay usuarios 
                        return res.json(user[0]); //retorno el arreglo en el primer indice encontrado, o sea el que le paso
                    }
                    else {
                        res.status(404).json({ text: "No existe el usuario" });
                    }
                    //if(err) throw err;
                    //res.json(user);
                });
            }
            catch (err) {
                throw err;
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //cifrando password
                //req.body.password = await bcrypt.hash(req.body.password,10);
                req.body.password = yield md5_typescript_1.Md5.init(req.body.password);
                const result = yield database_1.default.query('INSERT INTO virtual_users set ?', [req.body]);
                res.json({ message: 'Usuario Salvado' });
            }
            catch (e) {
                res.status(400).json({ text: "Este usuario ya existe" });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            //const oldUser = req.body;
            try {
                req.body.password = yield md5_typescript_1.Md5.init(req.body.password);
                yield database_1.default.query('UPDATE virtual_users set ? WHERE id=?', [req.body, id]);
            }
            catch (e) {
                res.status(404).json({ text: "Usuario en Uso" });
            }
            res.status(201).json({ message: "Usuario Actualizado" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM virtual_users WHERE id =?', [id]);
            res.json({ message: "Usuario eliminado correctamente" });
        });
    }
}
const userController = new UserController();
exports.default = userController;
//# sourceMappingURL=userController.js.map