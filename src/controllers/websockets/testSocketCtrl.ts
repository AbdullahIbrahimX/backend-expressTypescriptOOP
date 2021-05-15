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
        {
            name:'test2',
            eventType:socketEvent.EMIT,
            handler:()=>{},
            data: this.test2Data()
        }

    ];

    test2Data():object{
        console.log('done');
        return{
            data:{
                test:'good'
            }
        }
    }

    nameSpaceOnConnectHandler(socket: Socket, next: any) {
        console.log(socket.nsp.name.toString() + '   User connected : ' + socket.id);
    }


    handleTest(socket:Socket, next:any){

        console.log('test is good');
    }

    handleDisconnect(socket:Socket,next:any){
        console.log(`User Disconnected`)
    }





}
