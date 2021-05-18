import SocketIOControllers, {INsp, socketEvent} from "./SocketIOControllers";
import {Socket} from "socket.io";


// name:string;
// eventType:socketEvent;
// eventHandler:(socket:Socket,next:NextFunction)=>void;
// data?:any;
// room?:string;
// rooms?:string[];

export class testSocketCtrl extends SocketIOControllers{
    nameSpace: string = '/test';
    events: Array<INsp> = [
        {
            name:'test',
            eventType:socketEvent.ON,
            handler: this.handleTest
        },
        {
            name:'test1',
            eventType:socketEvent.EMIT,
            handler:()=>{}
        },
        {
            name:'disconnect',
            eventType:socketEvent.ON,
            handler:this.handleDisconnect
        },
    ];

    nameSpaceOnConnectHandler(socket: Socket, next: any) {
        console.log(this.nameSpace + '   User connected : ' + socket.id);
    }


    handleTest(socket:Socket, next:any){
        console.log(this.nameSpace+'test is good');
    }

    handleDisconnect(socket:Socket,next:any){
        console.log(this.nameSpace+`User Disconnected`)
    }





}
