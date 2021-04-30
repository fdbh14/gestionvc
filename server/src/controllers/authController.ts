import { Request, Response, NextFunction } from 'express';
import { Md5 } from "md5-typescript";
//import bcrypt from 'bcryptjs';
import config from '../libs/config';
//const { getUserByUserEmail } = require("../models/User");
import {User} from '../models/User';
import pool from '../database';
import jwt from 'jsonwebtoken';
import { token } from 'morgan';
import userController from './userController';

//import {UserController} from '../controllers/userController';

class AuthController {


  /*public async validatePassword(password: any): Promise<boolean> {
  const pv = request.body.password
  return await bcrypt.compare(password, pv.body.password);//comparo la contrasena que quierocifrar con la original del body 
  }*/
  public async createUser(req: Request, res: Response): Promise<any> {
    // Email Validation
    //let emailExists = userI.getUserByUserEmail;
    //console.log(req.body);
    //res.send('registro');
      //let idU:User;
      
      
    const emailExists = await pool.query('SELECT * FROM virtual_users WHERE email  = ?', [req.body.email], async function (err, emailExists, fields) {
      if (emailExists.length > 0) { return res.status(400).json('Este usuario ya existe'); }
      try {
        //cifrando password
        req.body.password = await Md5.init(req.body.password);
        //guardando user 
        const newLocal = 'INSERT INTO virtual_users set ?';
        await pool.query(newLocal, [req.body], function (err, savedUser, fields) {
         const {id}=req.params;
          //creando token
          const token = jwt.sign({ _id: id }, config.jwtSecret, { expiresIn: 60 * 60 * 24 });
          res.header('auth-token', token).json({ message: 'Usuario registrado con Exito' });
          //res.json(token);
          //console.log(token);
        });

      } catch (e) {
        res.status(400).json(e);
      }
    });

  }

  public async loginUser(req: Request, res: Response) {
    //valido que no esten vacios los campos
    let userT:User;
    const email = req.body.email;
    const password = req.body.password;
    if (!(email && password)) {
      res.status(400).json({ message: 'Los campos email y password son requeridos' });
    }
    //valido el email
    const newLocal = 'SELECT * FROM virtual_users WHERE email  = ?';
    pool.query(newLocal, [req.body.email], function (err, user, fields) {
      try {
      if (!(user.length > 0)) {//{ //Si la longitud del arreglo user es 0, o sea no hay usuarios que coinciden con ese correo
        //return res.json(user[0])//retorno el arreglo en el primer indice encontrado, o sea el que le paso
        //}

        res.status(404).json({ text: "Usuario NO Encontrado" });
      }

      //validando contraseña
      const queryp = 'SELECT * FROM virtual_users WHERE password  = ?';

      pool.query(queryp, [req.body.password], async function (err, bdpassword, fields) {
        if (!(bdpassword.length > 0)) { return res.status(400).json('Contraseña Errónea'); }//si el arreglo esta 0 o sea no coincide con la que le mandé, devuelve contraseña erronea

        else {
          //Create a Token
          
          
          const token: string = jwt.sign({ _id:req.userId }, config.jwtSecret || 'tokentest', { expiresIn: 60 * 60 * 24 });
          console.log(req.header('auth-token'), token);
          //res.header('auth-token', token).json({message:'Usuario logueado'});
          res.header('auth-token', token).json(user[0]);
          //res.status(200).json({message:'Logueado ok'});
          //res.send('login');
        }
      });
    }catch(e){
      res.status(400).json(e);
    }
    });
  }
  public async profile(req: Request, res: Response){
    //console.log(req.header('auth-token'));
    //userI._getUserByUserID
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




}
const authController = new AuthController();
export default authController;