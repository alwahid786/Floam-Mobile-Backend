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
exports.PayoutController = void 0;
const common_1 = require("@nestjs/common");
const payout_service_1 = require("./payout.service");
const payout_dto_1 = require("./payout.dto");
const user_service_1 = require("../users/user.service");
const appointment_service_1 = require("../appointment/appointment.service");
const appointment_entity_1 = require("../appointment/appointment.entity");
const userNotification_service_1 = require("../userNotification/userNotification.service");
const paymentHistory_service_1 = require("../paymentHistory/paymentHistory.service");
var cron = require('node-cron');
const moment = require('moment');
const bankDetail_service_1 = require("../bankDetail/bankDetail.service");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, { apiVersion: "2022-08-01" });
let PayoutController = class PayoutController {
    constructor(payoutService, userService, bankDetailService, appointmentService, UserNotificationService, paymentHistoryService) {
        this.payoutService = payoutService;
        this.userService = userService;
        this.bankDetailService = bankDetailService;
        this.appointmentService = appointmentService;
        this.UserNotificationService = UserNotificationService;
        this.paymentHistoryService = paymentHistoryService;
        this.log = new common_1.Logger('PayoutController');
        this.cron = cron.schedule('0 0 1 * *', () => __awaiter(this, void 0, void 0, function* () {
            var endDate = moment.utc().subtract(1, 'minutes');
            var month = moment.utc(endDate).month();
            var year = moment.utc(endDate).year();
            var date = moment.utc(endDate).date();
            var startDate = moment.utc().set({
                year: year,
                month: month,
                date: date,
                hour: 0,
                minute: 0,
                second: 0,
                millisecond: 0,
            });
            let payouts = yield this.payoutService.getPayoutWithDates(startDate, endDate);
            if (payouts.length > 0) {
                payouts.forEach((payout) => __awaiter(this, void 0, void 0, function* () {
                    let user = yield this.userService.getUser(payout.userId);
                    let bankDetail = yield this.bankDetailService.getEntry(payout.userId);
                    let transfer = yield this.payoutService.createTransferringToConnectAccount(payout, user);
                    if (transfer && transfer.id) {
                        yield this.payoutService.createPayoutToBankAccount(payout, bankDetail, user);
                    }
                }));
                return null;
            }
        }));
        if (!this.cron.running) {
            this.cron.start();
        }
        this.cron2 = cron.schedule('0 0 16 * *', () => __awaiter(this, void 0, void 0, function* () {
            var endDate = moment.utc().subtract(1, 'minutes');
            var startDate = moment.utc().startOf('month').startOf('day');
            let payouts = yield this.payoutService.getPayoutWithDates(startDate, endDate);
            if (payouts.length > 0) {
                payouts.forEach((payout) => __awaiter(this, void 0, void 0, function* () {
                    let user = yield this.userService.getUser(payout.userId);
                    let bankDetail = yield this.bankDetailService.getEntry(payout.userId);
                    let transfer = yield this.payoutService.createTransferringToConnectAccount(payout, user);
                    if (transfer && transfer.id) {
                        yield this.payoutService.createPayoutToBankAccount(payout, bankDetail, user);
                    }
                }));
                return null;
            }
        }));
        if (!this.cron2.running) {
            this.cron2.start();
        }
    }
    createPayout(payoutDto) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userService.getUser(payoutDto.userId);
            let appointment = yield this.appointmentService.getBooking(payoutDto.appointmentId);
            payoutDto.floamAmount = appointment.floamAmount;
            payoutDto.totalAmount = appointment.total;
            payoutDto.studioUserAmount =
                parseFloat(appointment.total) - payoutDto.floamAmount;
            const payout = yield this.payoutService.createPayout(payoutDto);
            return payout;
        });
    }
    createTransfer(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let { payouts } = body;
            payouts = yield Promise.all(payouts.map((payout) => __awaiter(this, void 0, void 0, function* () {
                console.log('payout :>> ', payout);
                yield this.userService.getUser(payout.userId);
                let appointment = yield this.appointmentService.getBooking(payout.appointmentId);
                if (appointment.status == appointment_entity_1.APPT_STATUSES.PAID) {
                    return null;
                }
                payout.floamAmount = appointment.floamAmount;
                payout.totalAmount = appointment.total;
                payout.studioUserAmount =
                    parseFloat(appointment.total) - appointment.floamAmount;
                const payouts = yield this.payoutService.createPayout(payout);
                let user = yield this.userService.getUser(payouts.userId);
                let bankDetail = yield this.bankDetailService.getEntry(payouts.userId);
                let transfer = yield this.payoutService.createTransferringToConnectAccount(payouts, user);
                if (transfer) {
                    const paymentText = `Your payment of $${payout.studioUserAmount} from ${user.firstName} ${user.lastName} is on the way`;
                    yield this.UserNotificationService.createNotification(paymentText, payout.userId, 'paymentOnTheWay', payout.appointmentId);
                    yield this.userService.sendPush(payout.userId, paymentText, "Payment");
                    const updateAppointment = yield this.appointmentService.updatePayment(payout.appointmentId);
                }
                return payouts;
            })));
            return payouts;
        });
    }
    updatePayout(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.log.log(`processing update...`);
            let payout = yield this.payoutService.update(id, body);
            return payout;
        });
    }
    updatePayoutByStudio(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let payout = yield this.payoutService.updateByStudio(body);
            return payout;
        });
    }
    getAllPayouts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.log.log('[GET] user payouts.');
            if (userId) {
                let payouts = this.payoutService.getUserPayouts(userId);
                return payouts;
            }
            else {
                let payouts = this.payoutService.getAllPayouts();
                return payouts;
            }
        });
    }
    getAllTodayPayout() {
        return __awaiter(this, void 0, void 0, function* () {
            const currDate = moment();
            const month = moment(currDate).month();
            const year = moment(currDate).year();
            const date = moment(currDate).date();
            const endDate = moment().set({
                year: year,
                month: month,
                date: date,
                hour: 23,
                minute: 59,
                second: 59,
                millisecond: 0,
            });
            const startDate = moment().set({
                year: year,
                month: month,
                date: date,
                hour: 0,
                minute: 0,
                second: 0,
                millisecond: 0,
            });
            const todayPayout = yield this.payoutService.getPayoutWithDates(startDate, endDate);
            const allPayouts = yield this.payoutService.getAllPayouts();
            const allPayments = yield this.paymentHistoryService.getAllPayments();
            return {
                todayPayout,
                allPayouts,
                allPayments
            };
        });
    }
    getAllPayoutsByFilter(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let payouts = this.payoutService.getAllPayoutsByFilter(body);
            return payouts;
        });
    }
    genratePaymentLink(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let customer = yield stripe.customers.create({
                'email': body.email,
                'description': body.email
            });
            const ephemeralKey = yield stripe.ephemeralKeys.create({ customer: customer.id }, { apiVersion: "2020-08-27" });
            const paymentIntent = yield stripe.paymentIntents.create({
                amount: body.amount * 100,
                currency: "usd",
                customer: customer.id,
                automatic_payment_methods: {
                    enabled: true,
                },
            });
            let result = {
                'result': 'Success',
                'message': 'Payment intent crerated successfully!',
                'payment_intent': paymentIntent.client_secret,
                'payment_intent_complete': paymentIntent,
                'ephemeral_key': ephemeralKey.secret,
                'customer_id': customer.id,
                'publishablekey': process.env.STRIPE_KEY,
                'secret': process.env.STRIPE_SECRET_KEY
            };
            return result;
        });
    }
    connectStripe() {
        return __awaiter(this, void 0, void 0, function* () {
            const bcrypt = require("bcrypt");
            const salt = yield bcrypt.genSalt(10);
            const data = "https://connect.stripe.com/express/oauth/authorize?redirect_uri=" + process.env.stripe_redirected_url + "&client_id=" + process.env.stripe_client_id + "&scope=read_write";
            return {
                status: "success",
                url: data
            };
        });
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payout_dto_1.PayoutDto]),
    __metadata("design:returntype", Promise)
], PayoutController.prototype, "createPayout", null);
__decorate([
    common_1.Post('/payout'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PayoutController.prototype, "createTransfer", null);
__decorate([
    common_1.Post(':id/update'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PayoutController.prototype, "updatePayout", null);
__decorate([
    common_1.Post('update'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PayoutController.prototype, "updatePayoutByStudio", null);
__decorate([
    common_1.Get('/all'),
    __param(0, common_1.Query('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayoutController.prototype, "getAllPayouts", null);
__decorate([
    common_1.Get('/todayPayout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PayoutController.prototype, "getAllTodayPayout", null);
__decorate([
    common_1.Post('/allPayouts'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PayoutController.prototype, "getAllPayoutsByFilter", null);
__decorate([
    common_1.Post('/get_payment_intent'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PayoutController.prototype, "genratePaymentLink", null);
__decorate([
    common_1.Get('/connect_stripe'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PayoutController.prototype, "connectStripe", null);
PayoutController = __decorate([
    common_1.Controller('payouts'),
    __metadata("design:paramtypes", [payout_service_1.PayoutService,
        user_service_1.UserService,
        bankDetail_service_1.BankDetailService,
        appointment_service_1.AppointmentService,
        userNotification_service_1.UserNotificationService,
        paymentHistory_service_1.PaymentHistoryService])
], PayoutController);
exports.PayoutController = PayoutController;
//# sourceMappingURL=payout.controller.js.map