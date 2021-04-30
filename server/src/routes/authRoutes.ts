import { Router } from 'express';
import  authController from '../controllers/authController';
import { TokenValidation } from '../libs/verifyToken';

class AuthRoutes{
    public router:Router;
    constructor(){
        this.router= Router();
        this.config();
    }
    config():void{
        this.router.post('/registro', authController.createUser);
        this.router.post('/login', authController.loginUser);
        this.router.get('/profile',TokenValidation, authController.profile);
        //this.router.get('/', (req,res)=>res.send('Hello Auth'));
        
		
    }

}
const authRoutes = new AuthRoutes();
export default authRoutes.router;