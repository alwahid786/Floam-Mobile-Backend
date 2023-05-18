"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotificationModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const userNotification_entity_1 = require("./userNotification.entity");
const userNotification_controller_1 = require("./userNotification.controller");
const userNotification_service_1 = require("./userNotification.service");
let UserNotificationModule = class UserNotificationModule {
};
UserNotificationModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([userNotification_entity_1.UserNotification])
        ],
        providers: [userNotification_service_1.UserNotificationService],
        controllers: [userNotification_controller_1.UserNotificationController],
        exports: [userNotification_service_1.UserNotificationService],
    })
], UserNotificationModule);
exports.UserNotificationModule = UserNotificationModule;
//# sourceMappingURL=userNotification.module.js.map