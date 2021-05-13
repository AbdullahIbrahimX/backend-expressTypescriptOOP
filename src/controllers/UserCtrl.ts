import Controller, {controllerMethods,IRoute} from "./Controller";
import {Request, Response, NextFunction} from "express";
import User from "../models/User";
import {getManager, getRepository} from "typeorm";
import {Error} from "mongoose";
import * as jwt from 'jsonwebtoken';
import secureRoute from "../config/passportSecureRoute";


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
        const {email,password} = req.body;
        const manager = getRepository(User);
        let user:User
        try{
            user = await manager.findOneOrFail({where:{email:email}});

            console.log(user);
            user.isPasswordMatch(password,user.password,(error:Error,match:boolean)=>{
                if(match){
                    const secret:string = process.env.JWT_SECRET || '';
                    const expire = process.env.JWT_EXPIRATION;

                    const token = jwt.sign({_id : user._id},secret,{expiresIn:expire});
                    super.sendSuccess(res,{userToken:token});
                }
            });
        }catch (e) {
            super.sendError(res, e);
        }
    }

    async handleRegister(req: Request,res:Response ,next: NextFunction){
        const {email , name , password} = req.body;
        const user = new User(name,email,password);


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
