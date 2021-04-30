import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from './config';
import {User} from '../models/User';


export interface IPayload {
    _id: string;
    iat: number;
    exp: number;
} 

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
   
    try {
        const token = req.header('auth-token');
        if (!token) return res.status(401).json('Acceso Denegado');
        const payload = jwt.verify(token, config.jwtSecret || 'tokentest') as IPayload;
        req.userId = payload._id;
        console.log(payload._id);
        next();
    } catch (e) {
        res.status(400).send('Token Incorrecto');
    }
}
