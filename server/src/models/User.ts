import pool from '../database';

import  {Request, Response, NextFunction} from 'express';
export interface User{
    _id:any,
    password: any,
    email:any
   
}
/*class User{

    public async _getUserByUserEmail(req: Request,res:Response):Promise<any> {
        
        pool.query(`select * from virtual_users where email = ?`, [req.body.email], (error, results, fields) => {
            if (error) {
                throw(error);
            }
            return res.json(results[0]);
        });
    }
    public async _getUserByUserID(req: Request,res:Response):Promise<any> {
       
        pool.query(`select * from virtual_users where id = ?`, [req.params], (error, results, fields) => {
            if (error) {
                throw (error);
            }
            return res.json(results[0]);
        });
    }
    get getUserByUserEmail() {
        return this._getUserByUserEmail;
    }
    set getUserByUserEmail(value) {
        this._getUserByUserEmail = value;
    }
}
const userI=new User();
export default userI;*/
