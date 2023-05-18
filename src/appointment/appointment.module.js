"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const calendar_module_1 = require("../calendar/calendar.module");
const userNotification_module_1 = require("../userNotification/userNotification.module");
const communication_module_1 = require("../communication/communication.module");
const appointment_entity_1 = require("./appointment.entity");
const studio_module_1 = require("../studio/studio.module");
const user_module_1 = require("../users/user.module");
const appointment_controller_1 = require("./appointment.controller");
const appointment_service_1 = require("./appointment.service");
const paymentHistory_module_1 = require("../paymentHistory/paymentHistory.module");
const payment_module_1 = require("../payment/payment.module");
const userCard_module_1 = require("../userCard/userCard.module");
const payout_module_1 = require("../payout/payout.module");
let AppointmentModule = class AppointmentModule {
};
AppointmentModule = __decorate([
    common_1.Module({
        imports: [
            common_1.forwardRef(() => user_module_1.UserModule),
            common_1.forwardRef(() => studio_module_1.StudioModule),
            common_1.forwardRef(() => communication_module_1.CommunicationModule),
            common_1.forwardRef(() => calendar_module_1.CalendarModule),
            common_1.forwardRef(() => userNotification_module_1.UserNotificationModule),
            common_1.forwardRef(() => paymentHistory_module_1.PaymentHistoryModule),
            common_1.forwardRef(() => payment_module_1.PaymentModule),
            common_1.forwardRef(() => userCard_module_1.UserCardModule),
            common_1.forwardRef(() => payout_module_1.PayoutModule),
            typeorm_1.TypeOrmModule.forFeature([appointment_entity_1.Appointment]),
        ],
        controllers: [appointment_controller_1.AppointmentController],
        providers: [appointment_service_1.AppointmentService],
        exports: [appointment_service_1.AppointmentService],
    })
], AppointmentModule);
exports.AppointmentModule = AppointmentModule;
//# sourceMappingURL=appointment.module.js.map