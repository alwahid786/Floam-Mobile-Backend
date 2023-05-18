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
exports.UserNotificationController = void 0;
const common_1 = require("@nestjs/common");
const userNotification_service_1 = require("./userNotification.service");
let UserNotificationController = class UserNotificationController {
    constructor(userNotificationService) {
        this.userNotificationService = userNotificationService;
        this.log = new common_1.Logger('UserNotificationController');
    }
    getUserNotifications(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.log.log('[GET] notification which belong to user');
            const userNotifications = yield this.userNotificationService.getNotificationsByUser(userId);
            this.userNotificationService.findReadNotification(userNotifications);
            return (userNotifications);
        });
    }
    markMessageAsRead(notificationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userNotificationService.markAsRead(notificationId);
        });
    }
    getDot(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.log.log('[GET] notification which belong to user');
            const userNotification = yield this.userNotificationService.getNotificationsByUserForDot(userId);
            if (userNotification) {
                return true;
            }
            else {
                return false;
            }
        });
    }
};
__decorate([
    common_1.Get('users/:userId'),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserNotificationController.prototype, "getUserNotifications", null);
__decorate([
    common_1.Post('/:notificationId/mark'),
    __param(0, common_1.Param('notificationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserNotificationController.prototype, "markMessageAsRead", null);
__decorate([
    common_1.Get('getDot/:userId'),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserNotificationController.prototype, "getDot", null);
UserNotificationController = __decorate([
    common_1.Controller('userNotifications'),
    __metadata("design:paramtypes", [userNotification_service_1.UserNotificationService])
], UserNotificationController);
exports.UserNotificationController = UserNotificationController;
//# sourceMappingURL=userNotification.controller.js.map