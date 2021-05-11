import Controller, {controllerMethods,IRoute} from "./Controller";
import {Request, Response, NextFunction} from "express";
import * as mongoose from "mongoose";
import User from "../Entities/User";

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
        console.log(req.body);
        super.sendError(res,"bad")
    }

}

export default UserCtrl;
