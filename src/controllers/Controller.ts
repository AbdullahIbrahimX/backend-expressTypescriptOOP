import {NextFunction, Response,Request, Router} from "express";


export enum controllerMethods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

export interface IRoute {
    path: string;
    method: controllerMethods;
    handler: (req: Request, res: Response, next: NextFunction) => void| Promise<void>;
    localMiddlewares: ((req: Request, res: Response, next: NextFunction) => void)[];
}


 abstract class Controller {
    public router : Router = Router();
    public abstract path: string;
    protected abstract readonly routes: Array<IRoute> = [];

    public setRoutes = (): Router => {
        for ( const route of this.routes ){
            for ( const localMiddleWare of route.localMiddlewares ) {
                this.router.use(route.path, localMiddleWare);
            }

            switch (route.method) {
                case controllerMethods.GET:
                    this.router.get(route.path,route.handler);
                    break;
                case controllerMethods.POST:
                    this.router.post(route.path,route.handler);
                    break;
                case controllerMethods.PUT:
                    this.router.put(route.path,route.handler);
                    break;
                case controllerMethods.DELETE:
                    this.router.delete(route.path,route.handler);
                    break;
                default:
                    console.log("not a valid method");
                    break;
            }
        }
        return this.router;
    }

     // these methods below must not be a properties< but methods (no "=>")
     protected sendSuccess(res: Response, data: object, message?: string): Response {
         return res.status(200).json({
             message: message || 'success',
             success:true,
             data: data
         });
     };

     protected sendError(res: Response, message?: string,errorCode?:number): Response {
         return res.status(errorCode||500).json({
             message: message || 'internal server error',
             success:false,
         });
     };
}
export default Controller;
