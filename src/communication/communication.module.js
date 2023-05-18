"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_gateway_1 = require("../app/app.gateway");
const user_module_1 = require("../users/user.module");
const communication_controller_1 = require("./communication.controller");
const communication_service_1 = require("./communication.service");
const notification_preference_entity_1 = require("./notification.preference.entity");
let CommunicationModule = class CommunicationModule {
};
CommunicationModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([notification_preference_entity_1.NotificationPreference]),
            common_1.forwardRef(() => user_module_1.UserModule),
        ],
        controllers: [communication_controller_1.CommunicationController],
        providers: [communication_service_1.CommunicationService, app_gateway_1.AppGateway],
        exports: [communication_service_1.CommunicationService]
    })
], CommunicationModule);
exports.CommunicationModule = CommunicationModule;
//# sourceMappingURL=communication.module.js.map