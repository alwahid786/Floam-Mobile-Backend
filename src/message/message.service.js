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
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const typeorm_2 = require("typeorm");
const message_entity_1 = require("./message.entity");
const _ = require('underscore');
let MessageService = class MessageService {
    constructor(messageRepo) {
        this.messageRepo = messageRepo;
        this.log = new common_1.Logger('MessageService');
    }
    createMessage(dto) {
        const { senderId, receiverId, content } = dto;
        const message = {
            content,
            senderId,
            receiverId,
            wasRead: false,
        };
        return this.messageRepo.save(message);
    }
    getMessagesBetweenUsers(senderId, receiverId) {
        return this.messageRepo.find({
            where: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId },
            ],
            order: { updatedAt: 'DESC' },
        });
    }
    getMessagesForReceiver(receiverId) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = yield this.messageRepo.find({
                order: { updatedAt: 'DESC' },
                where: [{ receiverId }, { senderId: receiverId }],
            });
            this.log.log('\n\n');
            const sortedMessages = [];
            messages.forEach((message) => {
                const receiver = message.senderId === receiverId ? message.sender : message.receiver;
                const sender = message.senderId !== receiverId ? message.sender : message.receiver;
                if (sender.id !== receiverId)
                    sortedMessages.push(Object.assign(Object.assign({}, message), { sender, receiver, senderId: sender.id, receiverId: receiver.id }));
            });
            let senders = lodash_1.groupBy(sortedMessages, 'senderId');
            const senderKeys = lodash_1.keys(senders);
            const response = [];
            for (const key of senderKeys) {
                const hasUnreadMessage = senders[key].find((s) => !s.wasRead) !== undefined;
                const sender = senders[key][0].sender;
                const receiver = senders[key][0].receiver;
                const user = sender.id === receiverId ? receiver : sender;
                const lastMessage = senders[key][0].content;
                const createdAt = senders[key][0].createdAt;
                response.push({ user, hasUnreadMessage, lastMessage, createdAt });
            }
            const newlist = _.uniq(response, (singleResponse) => singleResponse.user.id);
            return newlist;
        });
    }
    markAsRead(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield this.messageRepo.findOne(messageId);
            if (!message) {
                this.log.error(`message not found. id: ${messageId}`);
                throw new Error('Message Not found!');
            }
            message.wasRead = true;
            return this.messageRepo.save(message);
        });
    }
};
MessageService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(message_entity_1.Message)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map