import { Router } from 'express';
import userController from '../controllers/userController';
//import { TokenValidation } from '../libs/verifyToken';
//import { checkRole} from '../libs/role';


class UserRoutes{

    public router:Router;
    constructor(){
        this.router= Router();
        this.config();
    }
    config():void{
       this.router.get('/',userController.list);
       this.router.get('/:id', userController.getOne);
       this.router.post('/', userController.create);
       this.router.put('/:id', userController.update);
       this.router.delete('/:id', userController.delete);
		
        //this.router.get('/', (req,res)=>res.send('Usuarios'));
    }

}

const usersRoutes = new UserRoutes();
export default usersRoutes.router;
