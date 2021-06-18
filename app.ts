import * as dotenv from 'dotenv';
import {Application, RequestHandler} from 'express';
import * as http from 'http';
import Controller from "./src/controllers/Controller";
import {createConnection} from "typeorm";
import {Server} from "socket.io";
import SocketIOControllers from "./src/controllers/websockets/SocketIOControllers";

dotenv.config();


class App {
    private readonly app: Application;
    private readonly PORT: number;
    private httpServer!:http.Server;
    private readonly websocketServer:Server;


    constructor(app: Application, PORT: number,websocketServer:Server) {
        this.app = app;
        this.PORT = PORT;
        this.websocketServer = websocketServer;
    }

    public run() {
        this.app.set('port',this.PORT);
        this.httpServer = http.createServer(this.app);
    }

    public runHttp(){
        this.websocketServer.attach(this.httpServer,{cors:{origin:'*'},allowEIO3:true});
        this.httpServer.listen(this.PORT,()=>{
            console.log(`Http server is running on port ${this.PORT}`)
        });
    }

    public loadWebsocketControllers(nameSpaceControllers:Array<SocketIOControllers>):Server{
        nameSpaceControllers.forEach(controller => {
            this.websocketServer
                .of(controller.nameSpace)
                .use((socket,next)=>{
                    controller.setEvents(socket,next);
                    next();
                });
        });
        console.log('WebScoket are set up');
        return this.websocketServer;
    }



    public useMiddleware(middlewares: Array<RequestHandler>): void{
        middlewares.forEach(middleware => this.app.use(middleware));
    }

    public useControllers(controllers: Array<Controller>){
        controllers.forEach(controller => this.app.use(controller.path,controller.setRoutes()))
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
