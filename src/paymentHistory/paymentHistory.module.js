"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const paymentHistory_entity_1 = require("./paymentHistory.entity");
const paymentHistory_controller_1 = require("./paymentHistory.controller");
const paymentHistory_service_1 = require("./paymentHistory.service");
const user_module_1 = require("../users/user.module");
const appointment_module_1 = require("../appointment/appointment.module");
let PaymentHistoryModule = class PaymentHistoryModule {
};
PaymentHistoryModule = __decorate([
    common_1.Module({
        imports: [
            common_1.forwardRef(() => user_module_1.UserModule),
            common_1.forwardRef(() => appointment_module_1.AppointmentModule),
            typeorm_1.TypeOrmModule.forFeature([paymentHistory_entity_1.PaymentHistory])
        ],
        providers: [paymentHistory_service_1.PaymentHistoryService],
        controllers: [paymentHistory_controller_1.PaymentHistoryController],
        exports: [paymentHistory_service_1.PaymentHistoryService],
    })
], PaymentHistoryModule);
exports.PaymentHistoryModule = PaymentHistoryModule;
//# sourceMappingURL=paymentHistory.module.js.map