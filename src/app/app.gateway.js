"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
var EVENTS;
(function (EVENTS) {
    EVENTS["SEND"] = "message:send";
    EVENTS["MESSAGE_NEW"] = "message:new";
    EVENTS["ALL"] = "message:incoming";
})(EVENTS || (EVENTS = {}));
let AppGateway = class AppGateway {
    constructor() {
        this.log = new common_1.Logger('MessageGateway');
        this.clients = new Map();
    }
    handleConnection(client, ...args) {
        const { userId } = client.handshake.query;
        this.clients.set(userId, client);
        this.log.log(`client with userId: ${userId} has been connected`);
    }
    handleDisconnect(client) {
        const { userId } = client.handshake.query;
        this.clients.delete(userId);
        this.log.log(`client with userId: ${userId} has been disconnected`);
    }
    notifyClients(userId) {
        const client = this.clients.get(userId);
        if (!client) {
            return false;
        }
        this.server.emit(`${userId}-channel:message`, { sample: 'ade', other: 'b' });
        this.log.log(`clients notified`);
        return true;
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], AppGateway.prototype, "server", void 0);
AppGateway = __decorate([
    websockets_1.WebSocketGateway()
], AppGateway);
exports.AppGateway = AppGateway;
//# sourceMappingURL=app.gateway.js.map