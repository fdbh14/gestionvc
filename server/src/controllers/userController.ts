import  {Request, Response, NextFunction} from 'express';
//import bcrypt from 'bcryptjs';
import pool from '../database';
//import { text } from 'body-parser';
import {Md5} from "md5-typescript";

class UserController{

    public async list (req : Request, res: Response) {
        try {
        const user = pool.query('SELECT * FROM virtual_users', function (err, user, fields) {
            if (user.length > 0) {
                res.json(user);
            }
            else {
                res.status(404).json({message: "No hay usuarios"});
            }
        });
        
            
        } catch (err) {
            throw err;
        }
		
		        
    }
    public async getOne(req : Request, res: Response): Promise<any>{
        const {id}= req.params;//Obtengo el id del juego a actualizar
        try {
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
    }
    }
    public async create(req : Request, res: Response):Promise<any>{
        
    try {
        //cifrando password
        //req.body.password = await bcrypt.hash(req.body.password,10);
        req.body.password = await Md5.init(req.body.password);
        const result = await pool.query('INSERT INTO virtual_users set ?', [req.body]);
        res.json({message: 'Usuario Salvado'});
        }catch (e) { 
            res.status(400).json({text:"Este usuario ya existe"});
        }
    }
  
    public async update(req : Request, res: Response):Promise<any>{
        const {id} = req.params;
        //const oldUser = req.body;
        try{
            req.body.password = await Md5.init(req.body.password);
            await pool.query('UPDATE virtual_users set ? WHERE id=?', [req.body,id]);
            
        }catch(e){
            res.status(404).json({text:"Usuario en Uso"});
        }
        res.status(201).json({message: "Usuario Actualizado"});
    } 
    public async delete(req : Request, res: Response):Promise<void>{

        const {id}= req.params;
        await pool.query('DELETE FROM virtual_users WHERE id =?', [id]);
         res.json({message: "Usuario eliminado correctamente"});
        
        
    } 
    /*public async isAdmin(req : Request, res: Response,next:NextFunction){
        const {id}= req.params;
        const user = await pool.query('SELECT * FROM virtual_users WHERE id = ?', [id]);
        if(user.length > 0){
            //Check
          //res.json(user[0]);
          if((user[0].role === 'admin')){
            next();
          }else{
              res.status(401).json({message:'No coincide'});
          }
        }else{
            res.status(401).json({message:'No autorizado'});
        }

    }*/
        
    
}
const userController = new UserController();
export default userController;