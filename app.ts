import * as dotenv from 'dotenv';
import {Application,Request,Response,RequestHandler} from 'express';
import {Mongoose} from "mongoose";
import * as http from 'http';
import Controller from "./src/controllers/Controller";
import {createConnection} from "typeorm";
import User from "./src/Entities/User";
dotenv.config();


class App {
    private app: Application;
    private database: Mongoose;
    private readonly PORT: number;


    constructor(app: Application, database: Mongoose, PORT: number) {
        this.app = app;
        this.database = database;
        this.PORT = PORT;
    }

    public run() : http.Server {
        return this.app.listen(this.PORT,()=>{
            console.log(`Application is running on port ${this.PORT}`);
        });
    }

    public useMiddleware(middlewareObject: Array<RequestHandler>): void{
        middlewareObject.forEach(middleware => this.app.use(middleware));
    }
    //TODO find which type is the array
    public loadControllers(controllers: Array<Controller>): void{
        controllers.forEach(controller => this.app.use(controller.path, controller.setRoutes()));
    }


    public async initDB(): Promise<void> {
        try {
            const conn = await createConnection({
                type: 'mongodb',
                host: 'localhost',
                port: 27017,
                database: 'abdullahalsafwan',
                entities: [User],
                synchronize: true,
                logging: true
            });


        }catch (e) {

        }
    }
}
export default App;
