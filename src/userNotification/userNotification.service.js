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
exports.UserNotificationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const userNotification_entity_1 = require("./userNotification.entity");
let UserNotificationService = class UserNotificationService {
    constructor(userNotificationRepo) {
        this.userNotificationRepo = userNotificationRepo;
        this.log = new common_1.Logger('UserNotificationService');
    }
    createNotification(text, userId, type, entityId) {
        const data = {
            text: text,
            userId: userId,
            type: type,
            entityId: entityId,
            wasRead: false
        };
        return this.userNotificationRepo.save(data);
    }
    findReadNotification(userNotifications) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (var notification of userNotifications) {
                    notification.wasRead = true;
                    this.userNotificationRepo.save(notification);
                }
                return null;
            }
            catch (error) {
                return (error);
            }
        });
    }
    getNotificationsByUser(userId) {
        return this.userNotificationRepo.find({
            where: { userId },
            order: { createdAt: 'DESC' },
        });
    }
    getNotificationsByUserForDot(userId) {
        return this.userNotificationRepo.findOne({ where: { userId: userId, wasRead: false } });
    }
    markAsRead(notificationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const notification = yield this.userNotificationRepo.findOne({ where: { id: notificationId } });
            if (!notification) {
                this.log.error(`notification not found. id: ${notificationId}`);
                throw new Error('Notification Not found!');
            }
            notification.wasRead = true;
            return this.userNotificationRepo.save(notification);
        });
    }
};
UserNotificationService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(userNotification_entity_1.UserNotification)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserNotificationService);
exports.UserNotificationService = UserNotificationService;
//# sourceMappingURL=userNotification.service.js.map