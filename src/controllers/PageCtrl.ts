import Controller, {controllerMethods, IRoute} from "./Controller";
import {NextFunction, Request, Response} from "express";
import {getMongoRepository} from "typeorm";
import Page, {PageType, pageTypes} from "../models/Page";

class PageCtrl extends Controller{
    path: string = '/api/v1/page';
    protected readonly routes: Array<IRoute> =[
        {
            path:"/:type/:language",
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

    /**
     {
    "title":"test2",
    "type":"education" / "experience" / "skill",
    "index":1,
    "language":"en" / "ar"
     }
     **/
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

    /**
     {
    "type":"education" / "experience" / "skill",
    "language":"en" / "ar"
     }
     **/
    async readPage(req: Request, res:Response , next: NextFunction){
        const {type,language} = req.params;
        const manager = getMongoRepository(Page);
        try {
            const result = await manager.findOneOrFail({where:{type,language},relations:['content']});
            if(result.type === pageTypes.education ||
                result.type === pageTypes.experience ){
                result.content.sort((cardA,cardB)=>{
                    if (cardB.end_date && cardA.end_date){
                        if (cardA.end_date > cardB.end_date) return -1
                        if (cardA.end_date < cardB.end_date) return +1
                    }
                    return 0
                });
            }
            super.sendSuccess(res,result);
        }catch (e) {
            super.sendError(res,e);
        }
    }

    /**
     {
    "pageID":"60cbd5947435d01b7c42160b",
    "pagedata":{
        "title":"The Saudi Electronic University",
        "type":"education" / "experience" / "skill"
    }
     }
     **/
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

    /**
     {
    "pageID":"60cc1c11718ffe5db88e232b"
     }
     **/
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


