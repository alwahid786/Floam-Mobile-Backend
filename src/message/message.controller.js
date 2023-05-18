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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const common_1 = require("@nestjs/common");
const communication_service_1 = require("../communication/communication.service");
const create_message_dto_1 = require("./create.message.dto");
const message_service_1 = require("./message.service");
const userNotification_service_1 = require("../userNotification/userNotification.service");
const user_service_1 = require("../users/user.service");
let MessageController = class MessageController {
    constructor(messageService, commsService, UserNotificationService, userService) {
        this.messageService = messageService;
        this.commsService = commsService;
        this.UserNotificationService = UserNotificationService;
        this.userService = userService;
        this.log = new common_1.Logger('MessageController');
    }
    getMessagesBetweenUsers(senderId, receiverId) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = yield this.messageService.getMessagesBetweenUsers(senderId, receiverId);
            this.log.debug('messages: ');
            this.log.debug(messages);
            return messages;
        });
    }
    getMessagesSentToUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.messageService.getMessagesForReceiver(userId);
        });
    }
    createMessage(createMessageDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const senderUser = yield this.userService.getUser(createMessageDto.senderId);
            const receiverUser = yield this.userService.getUser(createMessageDto.receiverId);
            const text = ` You have recieved a new message from ${senderUser.firstName} ${senderUser.lastName}`;
            const message = yield this.messageService.createMessage(createMessageDto);
            const { receiverId } = createMessageDto;
            return message;
        });
    }
    markMessageAsRead(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.messageService.markAsRead(messageId);
        });
    }
};
__decorate([
    common_1.Get('/sender/:senderId/receiver/:receiverId'),
    __param(0, common_1.Param('senderId')),
    __param(1, common_1.Param('receiverId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getMessagesBetweenUsers", null);
__decorate([
    common_1.Get('/users/:userId'),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getMessagesSentToUser", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "createMessage", null);
__decorate([
    common_1.Post('/:messageId/mark'),
    __param(0, common_1.Param('messageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "markMessageAsRead", null);
MessageController = __decorate([
    common_1.Controller('messages'),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        communication_service_1.CommunicationService,
        userNotification_service_1.UserNotificationService,
        user_service_1.UserService])
], MessageController);
exports.MessageController = MessageController;
//# sourceMappingURL=message.controller.js.map