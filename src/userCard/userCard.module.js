"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCardModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("../users/user.module");
const userCard_entity_1 = require("./userCard.entity");
const userCard_controller_1 = require("./userCard.controller");
const userCard_service_1 = require("./userCard.service");
const paymentHistory_module_1 = require("../paymentHistory/paymentHistory.module");
let UserCardModule = class UserCardModule {
};
UserCardModule = __decorate([
    common_1.Module({
        imports: [
            common_1.forwardRef(() => user_module_1.UserModule),
            common_1.forwardRef(() => paymentHistory_module_1.PaymentHistoryModule),
            typeorm_1.TypeOrmModule.forFeature([userCard_entity_1.UserCard]),
        ],
        providers: [userCard_service_1.UserCardService],
        controllers: [userCard_controller_1.UserCardController],
        exports: [userCard_service_1.UserCardService],
    })
], UserCardModule);
exports.UserCardModule = UserCardModule;
//# sourceMappingURL=userCard.module.js.map