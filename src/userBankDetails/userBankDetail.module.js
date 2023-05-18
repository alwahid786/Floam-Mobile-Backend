"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBankDetailModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("../users/user.module");
const userBankDetail_controller_1 = require("./userBankDetail.controller");
const userBankDetail_entity_1 = require("./userBankDetail.entity");
const userBankDetail_service_1 = require("./userBankDetail.service");
let UserBankDetailModule = class UserBankDetailModule {
};
UserBankDetailModule = __decorate([
    common_1.Module({
        imports: [
            common_1.forwardRef(() => user_module_1.UserModule),
            typeorm_1.TypeOrmModule.forFeature([userBankDetail_entity_1.UserBankDetail]),
        ],
        providers: [userBankDetail_service_1.UserBankDetailService],
        controllers: [userBankDetail_controller_1.UserBankDetailController],
        exports: [userBankDetail_service_1.UserBankDetailService]
    })
], UserBankDetailModule);
exports.UserBankDetailModule = UserBankDetailModule;
//# sourceMappingURL=userBankDetail.module.js.map