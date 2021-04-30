import express, {Application} from 'express';

//Modules
import morgan from 'morgan';
import cors from 'cors';
//Routes
import IndexRoutes from './routes/indexRoutes';
import UserRoutes from './routes/userRoutes';
import AuthRoutes from './routes/authRoutes'

class Server{

    public app: Application;

    constructor(){

        this.app = express();
        this.config();
        this.routes();
    }
    //middlewares
    config(): void{
        this.app.set('port', process.env.PORT || 3500);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
    }
    //routes
    routes(): void{
        this.app.use('/',IndexRoutes);
        this.app.use('/api/auth', AuthRoutes);
        this.app.use('/api/user', UserRoutes);

    }
    start(): void{
        this.app.listen(this.app.get('port'), ()=> {
            console.log('Servidor corriendo en el puerto', this.app.get('port'));
        }
        );
    }

}

const server = new Server();
server.start();