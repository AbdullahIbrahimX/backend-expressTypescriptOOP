import Controller, {controllerMethods, IRoute} from "./Controller";
import secureRoute from "../config/passportSecureRoute";
import {Request, Response} from "express";
import { getMongoRepository, getRepository } from "typeorm";
import {Card} from "../models/Card";

class CardCtrl extends Controller{
    path: string = '/api/v1/cards';
    protected readonly routes: Array<IRoute> = [
        {
            path:'/',
            method:controllerMethods.POST,
            handler:this.create,
            localMiddlewares:[secureRoute]
        },
        {
            path:'/:path/:lang',
            method:controllerMethods.GET,
            handler:this.read,
            localMiddlewares:[]
        },
        {
            path:'/:id',
            method:controllerMethods.PUT,
            handler:this.update,
            localMiddlewares:[secureRoute]
        },
        {
            path:'/:id',
            method:controllerMethods.DELETE,
            handler:this.delete,
            localMiddlewares:[secureRoute]
        }
    ];

    async create(req: Request, res: Response){
        const card = req.body;
        const newCard = new Card(
            card.path,
            card.lang,
            card.index,
            card.title,
            card.type,
            card.content,
        )

        try {
            const manager = getMongoRepository(Card);
            const saveData = await manager.save(newCard);
            super.sendSuccess(res,saveData);
        }catch (e) {
            super.sendError(res);
        }
    }

    async read(req: Request, res: Response) {
        const path = req.params.path;
        const lang = req.params.lang;
        const query = {path, lang};

        const manager = getMongoRepository(Card)
        try {
            const data = await manager.find({where: query});
            if(data){
                super.sendSuccess(res, data);
            }else{
                super.sendError(res,'can\'t find card',204);
            }
        } catch (e) {
            super.sendError(res, e);
        }
    }

    //TODO not working : fix it
    async update(req: Request, res: Response) {
        const _id = req.params.id;
        const updateData = req.body;

        const query = {_id};

        try {
            const manager = getMongoRepository(Card);
            const oldCard = manager.findOne({where:query});
            if(oldCard){
                const updatedCard = await manager.updateOne(oldCard,updateData);
                super.sendSuccess(res,updatedCard);
            }else{
                super.sendError(res,'can\'t find old record');
            }
        } catch (e) {
            super.sendError(res,e);
        }
    }

    //
    async delete(req: Request, res: Response){
         const _id:string = req.params.id;

         try{
             const manager = getMongoRepository(Card);
             const response = await manager.delete(_id);

             response? super.sendSuccess(res,response):super.sendError(res);
         }catch (e) {
             super.sendError(res,e);
         }
    }


}

export default CardCtrl;
