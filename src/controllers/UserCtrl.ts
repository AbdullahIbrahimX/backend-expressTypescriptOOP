import Controller, {controllerMethods,IRoute} from "./Controller";
import User from '../models/User'
import {Request, Response, NextFunction} from "express";
import * as mongoose from "mongoose";

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
            path: '/register ',
            method: controllerMethods.POST,
            handler: this.handleRegister,
            localMiddlewares:[]
        }
    ];

    constructor() {
        super();
    }

    async handleLogin(req: Request,res:Response ,next: NextFunction) {
        // const { email,  password } = req.body;
        console.log(req.body)
        const { name,password,email,joined } = req.body;
        const newUser = new User({name,password,email,joined});

        try{
            // const data = await newUser.save();
            // this.sendSuccess(res,data,"success");
        }catch (e){
            // this.sendError(res,"bad");
        }
    }

    async handleRegister(req: Request,res:Response ,next: NextFunction){
        const tomato = mongoose.model
    }

}

export default UserCtrl;
