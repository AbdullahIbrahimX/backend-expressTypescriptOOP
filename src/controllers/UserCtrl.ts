import Controller, {controllerMethods,IRoute} from "./Controller";
import {Request, Response, NextFunction} from "express";
import User from "../Entities/User";
import {getManager} from "typeorm";


class UserCtrl extends Controller {
    path: string = '/api/user';
    protected readonly routes: Array<IRoute> = [
        {
            path: '/login',
            method: controllerMethods.POST,
            handler: this.handleLogin,
            localMiddlewares:[]
        },
        {
            path: '/register',
            method: controllerMethods.POST,
            handler: this.handleRegister,
            localMiddlewares:[]
        },
    ];

    constructor() {
        super();
    }

    async handleLogin(req: Request,res:Response ,next: NextFunction) {
        console.log(req.body);
        super.sendSuccess(res, {...req.body},"success");
    }

    async handleRegister(req: Request,res:Response ,next: NextFunction){
        const {email , name , password} = req.body;
        const user = new User();
        user.email = email;
        user.name = name;
        user.password = password;

        try {
            const manager = getManager("default");
            const response = await manager.save(user);
            super.sendSuccess(res,response,"success");
        }catch (e) {
            this.sendError(res,`internal error, ${e}`);
        }
    }

}

export default UserCtrl;
