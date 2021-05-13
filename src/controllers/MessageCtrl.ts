import Controller, {controllerMethods, IRoute} from "./Controller";
import {NextFunction, Request, Response} from "express";
import secureRoute from "../config/passportSecureRoute";
import Message from "../models/Message";
import {getRepository} from "typeorm";

class MessageCtrl extends Controller{
    path: string = '/api/messages';
    protected readonly routes: Array<IRoute> = [
        {
            path:'/send',
            method: controllerMethods.POST,
            handler:this.createMessage,
            localMiddlewares:[]
        },
        {
            path:'/get',
            method: controllerMethods.GET,
            handler:this.getMessages,
            localMiddlewares:[secureRoute]
        },
        {
            path:'/delete',
            method: controllerMethods.DELETE,
            handler:this.deleteMessage,
            localMiddlewares:[secureRoute]
        }
    ];

    async createMessage(req: Request, res: Response, next: NextFunction){
        const {email,message,name} = req.body;
        const newMessage = new Message(email,message,name);
        const manager = getRepository(Message);

        try {
            const response = await manager.save(newMessage);
            if (response){
                super.sendSuccess(res,{});
            }
        }catch (e) {
            super.sendError(res);
        }
    }

    async getMessages(req: Request, res: Response, next: NextFunction){
        const manager = getRepository(Message);

        try{
            const data = await manager.find()
            super.sendSuccess(res,data);
        }catch (e) {
            super.sendError(res);
        }
    }

    async deleteMessage(req: Request, res: Response, next: NextFunction){

    }

}

export default MessageCtrl;
