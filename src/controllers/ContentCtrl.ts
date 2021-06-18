import Controller, {controllerMethods, IRoute} from "./Controller";
import {NextFunction, Request, Response} from "express";
import {getMongoRepository} from "typeorm";
import Page from "../models/Page";
import Content, {ContentType} from "../models/Content";
import { v4 as uuidv4 } from "uuid";


class ContentCtrl extends Controller{
    path: string = '/api/v1/content';
    protected readonly routes: Array<IRoute> =[
        {
            path:"/",
            method:controllerMethods.GET,
            handler:this.readContent,
            localMiddlewares:[]
        },
        {
            path:"/",
            method:controllerMethods.POST,
            handler:this.createContent,
            localMiddlewares:[]
        },
        {
            path:"/",
            method:controllerMethods.PUT,
            handler:this.updateContent,
            localMiddlewares:[]
        },
        {
            path:"/",
            method:controllerMethods.DELETE,
            handler:this.deleteContent,
            localMiddlewares:[]
        },
    ];

    async createContent(req: Request, res:Response , next: NextFunction){
        let pageId:string = req.body.pageID;
        let contents:ContentType[] = req.body.content;
        const pageManager = getMongoRepository(Page);

        try{
            const page = await pageManager.findOne(pageId);

            const newContentArray:Array<Content> = page?.content || [];
            if(page){
                for (const content of contents) {
                    const newContent = new Content()
                    newContent._id = uuidv4();
                    newContent.level =content.level;
                    newContent.icon =content.icon;
                    newContent.title =content.title;
                    newContent.end_date =content.end_date;
                    newContent.start_date =content.start_date;
                    newContent.institution_name =content.institution_name;
                    newContentArray.push(newContent);
                }

                page.content = newContentArray;
                const result = await pageManager.save(page);
                super.sendSuccess(res,result);
            }else{
                super.sendError(res,'cant find page',202);
            }
        }catch (e) {
            super.sendError(res,e.toString());
        }
    }

    async readContent(req: Request, res:Response , next: NextFunction){
        const {pageID} = req.body;
        const manager = getMongoRepository(Page);

        try{
            const page = await manager.findOneOrFail(pageID);
            super.sendSuccess(res,page.content);
        }catch (e) {
            super.sendError(res,e);
        }
    }

    async updateContent(req: Request, res:Response , next: NextFunction){
        const {pageID,contentID} = req.body;
        const newContentData:ContentType = req.body.newContent;
        const manager = getMongoRepository(Page);

        try{
            const page = await manager.findOneOrFail(pageID);
            const index = page.content.findIndex(content => content._id === contentID);
            const updatedContent = new Content();

            updatedContent.level =newContentData.level;
            updatedContent.icon =newContentData.icon;
            updatedContent.title =newContentData.title;
            updatedContent.end_date =newContentData.end_date;
            updatedContent.start_date =newContentData.start_date;
            updatedContent.institution_name =newContentData.institution_name;

            page.content[index] = updatedContent;

            const result = await manager.save(page);
            super.sendSuccess(res,result);
        }catch (e) {
            super.sendError(res,e);
        }
    }

    async deleteContent(req: Request, res:Response , next: NextFunction){
        const {pageID,contentID} = req.body;
        const manager = getMongoRepository(Page);

        try{
            const page = await manager.findOneOrFail(pageID);
            const index = page.content.findIndex(content => content._id === contentID);

            page.content = page.content.splice(index,1);
            const result = await manager.save(page);
            super.sendSuccess(res,result);
        }catch (e) {
            super.sendError(res,e);
        }
    }




}
export default ContentCtrl;
