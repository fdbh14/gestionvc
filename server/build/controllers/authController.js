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
const md5_typescript_1 = require("md5-typescript");
//import bcrypt from 'bcryptjs';
const config_1 = __importDefault(require("../libs/config"));
const database_1 = __importDefault(require("../database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//import {UserController} from '../controllers/userController';
class AuthController {
    /*public async validatePassword(password: any): Promise<boolean> {
    const pv = request.body.password
    return await bcrypt.compare(password, pv.body.password);//comparo la contrasena que quierocifrar con la original del body
    }*/
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Email Validation
            //let emailExists = userI.getUserByUserEmail;
            //console.log(req.body);
            //res.send('registro');
            //let idU:User;
            const emailExists = yield database_1.default.query('SELECT * FROM virtual_users WHERE email  = ?', [req.body.email], function (err, emailExists, fields) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (emailExists.length > 0) {
                        return res.status(400).json('Este usuario ya existe');
                    }
                    try {
                        //cifrando password
                        req.body.password = yield md5_typescript_1.Md5.init(req.body.password);
                        //guardando user 
                        const newLocal = 'INSERT INTO virtual_users set ?';
                        yield database_1.default.query(newLocal, [req.body], function (err, savedUser, fields) {
                            const { id } = req.params;
                            //creando token
                            const token = jsonwebtoken_1.default.sign({ _id: id }, config_1.default.jwtSecret, { expiresIn: 60 * 60 * 24 });
                            res.header('auth-token', token).json({ message: 'Usuario registrado con Exito' });
                            //res.json(token);
                            //console.log(token);
                        });
                    }
                    catch (e) {
                        res.status(400).json(e);
                    }
                });
            });
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //valido que no esten vacios los campos
            let userT;
            const email = req.body.email;
            const password = req.body.password;
            if (!(email && password)) {
                res.status(400).json({ message: 'Los campos email y password son requeridos' });
            }
            //valido el email
            const newLocal = 'SELECT * FROM virtual_users WHERE email  = ?';
            database_1.default.query(newLocal, [req.body.email], function (err, user, fields) {
                try {
                    if (!(user.length > 0)) { //{ //Si la longitud del arreglo user es 0, o sea no hay usuarios que coinciden con ese correo
                        //return res.json(user[0])//retorno el arreglo en el primer indice encontrado, o sea el que le paso
                        //}
                        res.status(404).json({ text: "Usuario NO Encontrado" });
                    }
                    //validando contraseña
                    const queryp = 'SELECT * FROM virtual_users WHERE password  = ?';
                    database_1.default.query(queryp, [req.body.password], function (err, bdpassword, fields) {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (!(bdpassword.length > 0)) {
                                return res.status(400).json('Contraseña Errónea');
                            } //si el arreglo esta 0 o sea no coincide con la que le mandé, devuelve contraseña erronea
                            else {
                                //Create a Token
                                const token = jsonwebtoken_1.default.sign({ _id: req.userId }, config_1.default.jwtSecret || 'tokentest', { expiresIn: 60 * 60 * 24 });
                                console.log(req.header('auth-token'), token);
                                //res.header('auth-token', token).json({message:'Usuario logueado'});
                                res.header('auth-token', token).json(user[0]);
                                //res.status(200).json({message:'Logueado ok'});
                                //res.send('login');
                            }
                        });
                    });
                }
                catch (e) {
                    res.status(400).json(e);
                }
            });
        });
    }
    profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.header('auth-token'));
            //userI._getUserByUserID
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
}
const authController = new AuthController();
exports.default = authController;
//# sourceMappingURL=authController.js.map