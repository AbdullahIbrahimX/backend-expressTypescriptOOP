import * as dotenv from 'dotenv';
import {Application,Request,Response,RequestHandler} from 'express';
import * as http from 'http';
import Controller from "./src/controllers/Controller";
import {createConnection} from "typeorm";

dotenv.config();


class App {
    private app: Application;
    private readonly PORT: number;


    constructor(app: Application, PORT: number) {
        this.app = app;
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

    public loadControllers(controllers: Array<Controller>): void{
        controllers.forEach(controller => this.app.use(controller.path, controller.setRoutes()));
    }


    public async initDB(): Promise<void> {
        createConnection().then(connection =>{
            console.log("Connected to the database successfully");
        }).catch(e=>{
            console.log(e);
        });

    }
}
export default App;
