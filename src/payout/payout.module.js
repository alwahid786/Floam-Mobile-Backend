"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("../users/user.module");
const payout_entity_1 = require("./payout.entity");
const payout_controller_1 = require("./payout.controller");
const payout_service_1 = require("./payout.service");
const bankDetail_module_1 = require("../bankDetail/bankDetail.module");
const appointment_module_1 = require("../appointment/appointment.module");
const userNotification_module_1 = require("../userNotification/userNotification.module");
const paymentHistory_module_1 = require("../paymentHistory/paymentHistory.module");
let PayoutModule = class PayoutModule {
};
PayoutModule = __decorate([
    common_1.Module({
        imports: [
            common_1.forwardRef(() => user_module_1.UserModule),
            common_1.forwardRef(() => bankDetail_module_1.BankDetailModule),
            common_1.forwardRef(() => appointment_module_1.AppointmentModule),
            common_1.forwardRef(() => paymentHistory_module_1.PaymentHistoryModule),
            common_1.forwardRef(() => userNotification_module_1.UserNotificationModule),
            typeorm_1.TypeOrmModule.forFeature([payout_entity_1.Payout]),
        ],
        providers: [payout_service_1.PayoutService],
        controllers: [payout_controller_1.PayoutController],
        exports: [payout_service_1.PayoutService],
    })
], PayoutModule);
exports.PayoutModule = PayoutModule;
//# sourceMappingURL=payout.module.js.map