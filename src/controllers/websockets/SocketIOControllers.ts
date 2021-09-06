import {Server, Socket} from "socket.io";
import {NextFunction, Request, Response} from "express";


export enum socketEvent {
    ON,
    EMIT,
    BC,
    ONCE,
    ON_ANY,
    OFF_ANY,
    JOIN,
    TO_ROOM,
    TO_ROOMS,
    VOLATILE,
}

export interface INsp{
    name:string;
    eventType:socketEvent;
    handler:(socket:Socket,next:any)=>void ;
    data?:any;
    room?:string;
    rooms?:string[];
}


type expressMiddleware = (req: any, res: Response, next: NextFunction)=>void;
type ioMiddleware = (socket:Socket,next:NextFunction)=>void;


abstract class SocketIOControllers{
    public server:Server;
    public abstract nameSpace:string;
    public abstract localMiddleware: (expressMiddleware|ioMiddleware)[];
    public abstract events:Array<INsp>;

    constructor(websocketServer:Server) {
        this.server = websocketServer
    }


    public abstract nameSpaceOnConnectHandler(socket:Socket, next:any):void;

    public setEvents(socket:Socket,next:any):void{
        this.nameSpaceOnConnectHandler(socket,next);


        const wrapper = (middleware:any) => (socket: Socket, next: any) => middleware(socket.request, {}, next);
        this.localMiddleware.forEach((middleware)=>{
            this.server.of(this.nameSpace).use(wrapper(middleware));
        });


        this.events.forEach(event=>{
            switch (event.eventType){
                case socketEvent.ON:
                    // this.server.of(this.nameSpace).on("")
                    return socket.on(event.name, event.handler);
                case socketEvent.EMIT:
                    return socket.emit(event.name,event.data!);
                case socketEvent.BC:
                    return socket.broadcast.emit(event.name,event.data!);
                case socketEvent.ONCE:
                    return socket.once(event.name,event.handler);
                case socketEvent.ON_ANY:
                    return socket.onAny(event.handler);
                case socketEvent.OFF_ANY:
                    return socket.offAny(event.handler)
                case socketEvent.JOIN:
                    return socket.join(event.name);
                case socketEvent.TO_ROOM:
                    return socket.to(event.room||'').emit(event.name,event.data!)
                case socketEvent.TO_ROOMS:
                    return event.rooms?.forEach(roomName =>
                        socket.to(roomName).emit(event.name,event.data!));
                case socketEvent.VOLATILE:
                    return socket.volatile.emit(event.name,event.data!);
                default:
                    console.log('Event Type Error');
            }
        })
    }
}
export default SocketIOControllers;
