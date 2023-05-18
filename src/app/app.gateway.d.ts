import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class AppGateway implements OnGatewayConnection<Socket>, OnGatewayDisconnect {
    private log;
    readonly server: Server;
    private clients;
    handleConnection(client: Socket, ...args: any[]): any;
    handleDisconnect(client: Socket): any;
    notifyClients(userId: string): boolean;
}
