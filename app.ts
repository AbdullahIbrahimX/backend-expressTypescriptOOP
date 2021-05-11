import * as dotenv from 'dotenv';
import {Application,Request,Response,RequestHandler} from 'express';
import {Mongoose} from "mongoose";
import * as http from 'http';
import Controller from "./src/controllers/Controller";
import {createConnection} from "typeorm";
import User from "./src/Entities/User";
import typeormMongodb from "./src/config/typeormMongodb";
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
        // createConnection({
        //     type: 'mongodb',
        //     host: 'localhost',
        //     port: 27017,
        //     database: 'abdullahalsafwan',
        //     entities: [User],
        //     synchronize: true,
        //     logging: true,
        //     useUnifiedTopology:true
        // }).then(connection =>{
        //     console.log("Connected to the database successfully");
        // }).catch(e=>{
        //     console.log(e);
        // });

        // @ts-ignore
        //TODO this has to be changed to save the password
        createConnection().then(connection =>{
            console.log("Connected to the database successfully");
        }).catch(e=>{
            console.log(e);
        });

    }
}
export default App;
