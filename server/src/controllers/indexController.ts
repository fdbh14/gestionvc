import  {Request, Response} from 'express';

class IndexController{

    public index (req : Request, res: Response) {
        res.json({text: 'La API User esta en: /api/user y la Autenticacion en /api/auth'});
    }
}
export const indexController = new IndexController();