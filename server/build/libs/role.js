"use strict";
/*import  {Request, Response, NextFunction} from 'express';

import pool from '../database';
import {TokenValidation} from './verifyToken';


export const checkRole =(roles:Array<any>)=>{
    return async (req:Request, res:Response, next:NextFunction)=>{
        
        //const role = req.body.role;
       
        const user = await pool.query('SELECT * FROM virtual_users WHERE id = ?', [req.userId]);
        if(user.length > 0){
            //Check
          res.json(user[0]);
          const {role} = user;
          if(roles.includes(role)){
            next();
          }else{
              res.status(401).json({message:'No coincide el rol'});
          }
          
        }else{
            res.status(401).json({message:'No encuentro usuario'});
        }
        
    };

};*/
//# sourceMappingURL=role.js.map