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
exports.PaymentHistoryController = void 0;
const common_1 = require("@nestjs/common");
const paymentHistory_service_1 = require("./paymentHistory.service");
const user_service_1 = require("../users/user.service");
const appointment_service_1 = require("../appointment/appointment.service");
let PaymentHistoryController = class PaymentHistoryController {
    constructor(paymentHistoryService, appointmentService, userService) {
        this.paymentHistoryService = paymentHistoryService;
        this.appointmentService = appointmentService;
        this.userService = userService;
        this.log = new common_1.Logger('paymentHistoryController');
    }
    getUserPayments(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("in users");
            this.log.log('[GET] payment which belong to user');
            yield this.userService.getUser(userId);
            const userPayments = yield this.paymentHistoryService.getPaymentByUser(userId);
            return (userPayments.reverse());
        });
    }
    earnings(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("in earning");
            this.log.log('[GET] payment which belong to user');
            yield this.userService.getUser(userId);
            const earnings = yield this.paymentHistoryService.getEarnings(userId);
            return (earnings);
        });
    }
    todayPayment() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.appointmentService.getAllAppts();
        });
    }
};
__decorate([
    common_1.Get('users/:userId'),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentHistoryController.prototype, "getUserPayments", null);
__decorate([
    common_1.Get('earnings/:userId'),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentHistoryController.prototype, "earnings", null);
__decorate([
    common_1.Get('todayPayment'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentHistoryController.prototype, "todayPayment", null);
PaymentHistoryController = __decorate([
    common_1.Controller('paymentHistories'),
    __metadata("design:paramtypes", [paymentHistory_service_1.PaymentHistoryService,
        appointment_service_1.AppointmentService,
        user_service_1.UserService])
], PaymentHistoryController);
exports.PaymentHistoryController = PaymentHistoryController;
//# sourceMappingURL=paymentHistory.controller.js.map