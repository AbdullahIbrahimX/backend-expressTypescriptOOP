import SocketIOControllers, {INsp, socketEvent} from "./SocketIOControllers";
import {Socket} from "socket.io";

export default class MainRoutSocketCtrl extends SocketIOControllers{
    nameSpace: string = '/';
    events: Array<INsp> = [
        {
            name:'disconnect',
            eventType:socketEvent.ON,
            handler:this.handleOnDisconnect
        }
    ];

    nameSpaceOnConnectHandler(socket: Socket, next: any): void {
        console.log(this.nameSpace + '   User connected : ' + socket.id)
    }

    handleOnDisconnect(socket: Socket, next: any){
        console.log(this.nameSpace + '   User Disconnected ')
    }

}
