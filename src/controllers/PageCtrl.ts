import Controller, {controllerMethods, IRoute} from "./Controller";
import {NextFunction, Request, Response} from "express";
import {getMongoRepository} from "typeorm";
import Page, {PageType} from "../models/Page";

class PageCtrl extends Controller{
    path: string = '/api/v1/page';
    protected readonly routes: Array<IRoute> =[
        {
            path:"/",
            method:controllerMethods.GET,
            handler:this.readPage,
            localMiddlewares:[]
        },
        {
            path:"/",
            method:controllerMethods.POST,
            handler:this.createPage,
            localMiddlewares:[]
        },
        {
            path:"/",
            method:controllerMethods.PUT,
            handler:this.updatePage,
            localMiddlewares:[]
        },
        {
            path:"/",
            method:controllerMethods.DELETE,
            handler:this.deletePage,
            localMiddlewares:[]
        },
    ];

    async createPage(req: Request,res:Response ,next: NextFunction){
        const {title,type,index,language} = req.body;
        const manager = getMongoRepository(Page);
        const newPage = new Page();
        newPage.title = title;
        newPage.type = type;
        newPage.index = index;
        newPage.language = language;
        newPage.content = [];

        try{
            const result = manager.save(newPage);
            super.sendSuccess(res,result);
        }catch (e) {
            super.sendError(res,e,e.code);
        }
    }

    async readPage(req: Request, res:Response , next: NextFunction){
        const {type,language} = req.body;
        const manager = getMongoRepository(Page);
        try {
            const result = await manager.findOneOrFail({where:{type,language},relations:['content']});
            super.sendSuccess(res,result);
        }catch (e) {
            super.sendError(res,e);
        }
    }

    async updatePage(req: Request, res:Response , next: NextFunction){
        const pageID:string = req.body.pageID;
        const pageData:PageType = req.body.pagedata;
        const manager = getMongoRepository(Page);

        try{
            const result = await manager.update(pageID,pageData);
            super.sendSuccess(res,result);
        }catch (e) {
            super.sendError(res,e);
        }
    }

    async deletePage(req: Request, res:Response , next: NextFunction){
        const {pageID} = req.body;
        const manager = getMongoRepository(Page);
        try {
            const result = await manager.delete(pageID);
            super.sendSuccess(res,result);
        }catch (e) {
            super.sendError(res,e);
        }
    }


}
export default PageCtrl;


