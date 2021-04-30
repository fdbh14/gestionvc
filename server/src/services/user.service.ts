import {User} from '../models/User';
import pool from '../database';
import {Request, Response} from 'express';

class UserService{
    

public async getById(req : Request, res: Response, id:string){
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
    }
}
const userServ = new UserService();
export default userServ;