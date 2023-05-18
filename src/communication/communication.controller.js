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
exports.CommunicationController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../users/user.service");
const communication_service_1 = require("./communication.service");
const notification_preference_entity_1 = require("./notification.preference.entity");
let CommunicationController = class CommunicationController {
    constructor(commsService, userService) {
        this.commsService = commsService;
        this.userService = userService;
    }
    savePreferences(preference) {
        return this.commsService.saveNotificationPreference(preference);
    }
    getPreferences(userId) {
        return this.commsService.getNotificationPreferences(userId);
    }
    addPushToken({ userId, token }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUser(userId);
            user.pushToken = token;
            yield this.userService.createOrUpdateUser(user);
            return 'push token saved.';
        });
    }
};
__decorate([
    common_1.Post('/preferences'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notification_preference_entity_1.NotificationPreference]),
    __metadata("design:returntype", void 0)
], CommunicationController.prototype, "savePreferences", null);
__decorate([
    common_1.Get('/preferences/users/:userId'),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommunicationController.prototype, "getPreferences", null);
__decorate([
    common_1.Post('/push-token'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommunicationController.prototype, "addPushToken", null);
CommunicationController = __decorate([
    common_1.Controller('communication'),
    __metadata("design:paramtypes", [communication_service_1.CommunicationService,
        user_service_1.UserService])
], CommunicationController);
exports.CommunicationController = CommunicationController;
//# sourceMappingURL=communication.controller.js.map