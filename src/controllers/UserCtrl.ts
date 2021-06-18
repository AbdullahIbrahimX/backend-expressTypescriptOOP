import Controller, {controllerMethods, IRoute} from "./Controller";
import {NextFunction, Request, Response} from "express";
import User from "../models/User";
import {getRepository} from "typeorm";
import * as jwt from 'jsonwebtoken';
import {validateOrReject} from "class-validator";


export class UserCtrl extends Controller {
    path: string = '/api/v1/user';
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
        {
            path: '/updateUser',
            method: controllerMethods.PUT,
            handler: this.handleUserUpdate,
            localMiddlewares:[]
        },

    ];



    async handleLogin(req: Request,res:Response ,next: NextFunction) {

        const {email,password} = req.body;
        const manager = getRepository(User);
        try{
            const user = await manager.findOneOrFail({where:{email:email}});

            await user.isPasswordMatch(password,(error?:Error,match?:boolean)=>{
                if (!error) {
                    if(match){
                        const secret:string = process.env.JWT_SECRET || '';
                        const expire = process.env.JWT_EXPIRATION;

                        const token = jwt.sign({_id : user._id},secret,{expiresIn:expire});
                        super.sendSuccess(res,{userToken:token});
                    }else{
                        const message = 'user email or password is wrong'
                        super.sendError(res,message,403)
                    }
                }else{
                    this.sendError(res,`INTERNAL ERROR: ${error}`,500);
                }
            });
        }catch (e) {
            if (e.name === 'EntityNotFound'){
                const message = 'user email or password is wrong'
                super.sendError(res,message,403)
            }else{
                super.sendError(res, e);
            }
        }
    }

    async handleRegister(req: Request,res:Response ,next: NextFunction){
        const {email , name , password} = req.body;
        const user = new User();
        user.email =email;
        user.name = name;
        user.password = password;

        try {
            await validateOrReject(user)
            const manager = getRepository(User);
            const response:User = await manager.save(user);
            if (response){
                super.sendSuccess(res,response.getUserData(),"success");
            }else{
                super.sendError(res,`Internal error`);
            }
        }catch (e) {
            super.sendError(res,`Internal error: , ${e}`);
        }
    }

    async handleUserUpdate(req: Request,res:Response ,next: NextFunction){
        const {_id, email , password, name} = req.body
        const manager = getRepository(User);

        try{
            const user:User = await manager.findOneOrFail({where:_id});
            await user.updateUserData(name,email,password);
            await manager.save(user);

            super.sendSuccess(res,user.getUserData());
        }catch (e) {
            super.sendError(res)
        }

    }

}



