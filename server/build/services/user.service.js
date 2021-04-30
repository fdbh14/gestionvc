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
Object.defineProperty(exports, "__esModule", { value: true });
class UserService {
    getById(req, res, id) {
        return __awaiter(this, void 0, void 0, function* () {
            //const {id}= req.params;//Obtengo el id del juego a actualizar
            /*try {
              const user = await pool.query('SELECT * FROM virtual_users WHERE id = ?', [id],function(err, user, fields){ //Guardo en una constante user el resultado devuelto de consultar el id que paso con el de la BD
              if(user.length > 0){ //Si la longitud del arreglo games es > 0, o sea hay usuarios
               return res.json(user[0])//retorno el arreglo en el primer indice encontrado, o sea el que le paso
              }
              else{  res.status(404).json({text: "No existe el usuario"}); }
             //if(err) throw err;
             //res.json(user);
            });
        } catch (err) {
            throw err;
        }*/
        });
    }
}
const userServ = new UserService();
exports.default = userServ;
//# sourceMappingURL=user.service.js.map