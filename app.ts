import * as dotenv from 'dotenv';
import {Application,Request,Response,RequestHandler} from 'express';
import {Mongoose} from "mongoose";
import * as http from 'http';
import Controller from "./src/controllers/Controller";
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
            this.database.connect(process.env.MONGO_DB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });
            this.database.connection.on('connected',()=>{
                console.log("Connected to database Successfully");
            });
            this.database.connection.on('error',(err)=>{
                console.log(err);
            });
        } catch (e) {
            console.log(e);
        }
    }
}
export default App;
