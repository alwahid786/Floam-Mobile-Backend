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
exports.AppointmentController = void 0;
const common_1 = require("@nestjs/common");
const studio_service_1 = require("../studio/studio.service");
const user_service_1 = require("../users/user.service");
const appointment_service_1 = require("./appointment.service");
const payout_service_1 = require("../payout/payout.service");
const userNotification_service_1 = require("../userNotification/userNotification.service");
var cron = require('node-cron');
const paymentHistory_service_1 = require("../paymentHistory/paymentHistory.service");
const uuid_1 = require("uuid");
const payment_service_1 = require("../payment/payment.service");
const userCard_service_1 = require("../userCard/userCard.service");
const moment = require("moment");
let AppointmentController = class AppointmentController {
    constructor(studioService, appointmentService, userService, UserNotificationService, payoutService, paymentHistoryService, paymentService, userCardService) {
        this.studioService = studioService;
        this.appointmentService = appointmentService;
        this.userService = userService;
        this.UserNotificationService = UserNotificationService;
        this.payoutService = payoutService;
        this.paymentHistoryService = paymentHistoryService;
        this.paymentService = paymentService;
        this.userCardService = userCardService;
        this.log = new common_1.Logger('AppointmentController');
        this.cron = cron.schedule('0 * * * * *', () => __awaiter(this, void 0, void 0, function* () {
            let appointments = yield this.appointmentService.getAll();
            if (appointments.length > 0) {
                for (var appointment of yield appointments) {
                    yield this.appointmentService.updateAppointment(appointment);
                    const studio = yield this.studioService.getStudio(appointment.studioId);
                    let now = new Date();
                    let studio_date = new Date(studio.studioOpen);
                    let hour = studio_date.getTime() - now.getTime();
                    let seconds = Math.floor(hour / 1000);
                    let minutes = Math.floor(seconds / 60);
                    const hours = Math.floor(minutes / 60);
                    const text = `You have an upcoming session at ${studio.name} in ${hours} hours`;
                    yield this.UserNotificationService.createNotification(text, appointment.userId, 'upcomingAppointment', appointment.id);
                    yield this.userService.sendPush(appointment.userId, text, "Upcoming Session");
                }
                return null;
            }
        }));
        if (!this.cron.running) {
            this.cron.start();
        }
        this.cron2 = cron.schedule('0 * * * * *', () => __awaiter(this, void 0, void 0, function* () {
            let appointments = yield this.appointmentService.getApptAll();
            if (appointments.length > 0) {
                for (var appointment of yield appointments) {
                    yield this.appointmentService.updateEarningVariable(appointment);
                    const studio = yield this.studioService.getStudio(appointment.studioId);
                    const user = yield this.userService.getUser(studio.userId);
                    let studioUserAmount = parseFloat(appointment.total) - appointment.floamAmount;
                    const paymentText = `You have recieved payment of $${studioUserAmount} from ${user.firstName} ${user.lastName}`;
                    yield this.UserNotificationService.createNotification(paymentText, user.id, 'paymentRecieved', appointment.id);
                    yield this.userService.sendPush(user.id, paymentText, "Payment Received");
                    yield this.paymentHistoryService.createPaymentLog(user, null, studioUserAmount, 'managerAmount', appointment.id);
                }
                return null;
            }
        }));
        if (!this.cron2.running) {
            this.cron2.start();
        }
    }
    cancelAppointments(apptId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.appointmentService.cancelAppointmentData(apptId);
            if (data)
                return true;
            return false;
        });
    }
    getStudioBookings(studioBookingsRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, currentDate, studioId, timeZone } = studioBookingsRequest;
            console.log("inside studios userId, currentDate, studioId", userId, currentDate, studioId);
            const studio = yield this.studioService.getStudio(studioId);
            const data = yield this.appointmentService.getBookingsOfStudio(studio.id, currentDate, timeZone);
            return data;
        });
    }
    getAllStudioBookings(studioId) {
        return __awaiter(this, void 0, void 0, function* () {
            const studio = yield this.studioService.getStudio(studioId);
            return this.appointmentService.getStudioBookings(studio);
        });
    }
    getAllStudioBooking(studioId) {
        return __awaiter(this, void 0, void 0, function* () {
            const studio = yield this.studioService.getStudio(studioId);
            let data = yield this.appointmentService.getStudioBooking(studio);
            data = yield Promise.all(data.map((item) => __awaiter(this, void 0, void 0, function* () {
                item['paymentHistory'] = yield this.paymentHistoryService.getPaymentByTransactionId(item.id);
                return item;
            })));
            return data;
        });
    }
    reserveStudio(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.log.log('[POST] reserve studio');
            const { studioId, userId, startDateTime, endDateTime, paymentIntent } = data;
            if (startDateTime > endDateTime) {
                return null;
            }
            const studio = yield this.studioService.getStudio(studioId);
            const studioUser = yield this.userService.getUser(studio.userId);
            const user = yield this.userService.getUser(userId);
            let uuid = yield uuid_1.v1();
            let paymentHistory = null;
            data.floamAmount = (20 / 100) * parseInt(data.total);
            let studioUserAmount = parseInt(data.total) - data.floamAmount;
            if (paymentIntent) {
                paymentHistory = yield this.paymentHistoryService.createPaymentLog(user, paymentIntent, data.total, null, null);
            }
            else {
                paymentHistory = yield this.paymentHistoryService.createPaymentLog(user, null, data.total, null, null);
            }
            const text = `${user.firstName} ${user.lastName} has booked your Studio`;
            yield this.UserNotificationService.createNotification(text, studioUser.id, 'appointmentCreate', studio.id);
            yield this.userService.sendPush(studioUser.id, text, "Booking");
            let apptId = yield this.appointmentService.createBooking(data, studio, user);
            paymentHistory.appointmentId = apptId;
            yield this.paymentHistoryService.saveAppointmentId(paymentHistory);
            return 'Reservation made successfully!';
        });
    }
    getApptsToReview(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUser(userId);
            const studios = yield this.studioService.getStudiosByUser(user);
            const asGuest = yield this.appointmentService.apptsGuestNeedsToReview(user);
            const asHost = yield this.appointmentService.apptsHostNeedsToReview(studios);
            return { asGuest, asHost };
        });
    }
    cancelAppointment(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.log.log(`processing cancel appointment ...`);
            const { apptId, reason, cancelledByUserId } = body;
            yield this.appointmentService.cancelAppointment(apptId, reason, cancelledByUserId);
            let appt = yield this.appointmentService.getBooking(apptId);
            let studio = yield this.studioService.getStudio(appt.studioId);
            const artistUser = yield this.userService.getUser(cancelledByUserId);
            const user = yield this.userService.getUser(appt.userId);
            let paymentHistory = yield this.paymentHistoryService.getPaymentByTransactionId(apptId);
            var startTime = moment(new Date(), 'DD-MM-YYYY hh:mm:ss');
            var endTime = moment(appt.start, 'DD-MM-YYYY hh:mm:ss');
            var hoursDiff = endTime.diff(startTime, 'hours');
            if (paymentHistory) {
                if (artistUser.id === studio.userId) {
                    let refund = yield this.paymentHistoryService.createRefund(paymentHistory);
                    if (refund.status == 'succeeded') {
                        yield this.paymentHistoryService.createRefundLog(user, null, refund, paymentHistory.amount, 'notRefund', 0, apptId);
                    }
                }
                else if (hoursDiff < 24 && artistUser.id != studio.userId) {
                    let studioUserAmount = (3 / 100) * paymentHistory.amount;
                    let artistUserAmount = paymentHistory.amount - studioUserAmount;
                    let refund = yield this.paymentHistoryService.createRefund(paymentHistory);
                    if (refund.status == 'succeeded') {
                        yield this.paymentHistoryService.createRefundLog(artistUser, studio.userId, refund, studioUserAmount, 'refund', artistUserAmount, apptId);
                    }
                }
                else {
                    let refund = yield this.paymentHistoryService.createRefund(paymentHistory);
                    if (refund.status == 'succeeded') {
                        yield this.paymentHistoryService.createRefundLog(artistUser, null, refund, paymentHistory.amount, 'notRefund', 0, apptId);
                    }
                }
            }
            return appt;
        });
    }
    confirmAppointment(apptId) {
        this.log.log(`processing confirm appointment ...`);
        return this.appointmentService.markApptAsConfirmed(apptId);
    }
    createChatReport(cardNumber, expMonth, expYear, cvc) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                cardNumber: cardNumber,
                expMonth: expMonth,
                expYear: expYear,
                cvc: cvc
            };
            let token = yield this.paymentHistoryService.createCardToken(data);
            return token;
        });
    }
    getTimings(studioId) {
        return __awaiter(this, void 0, void 0, function* () {
            let timings = [];
            let studio = yield this.studioService.getStudio(studioId);
            const studioBookings = yield this.appointmentService.studioBookings(studio.id);
            const studioCalenders = yield this.appointmentService.studioCalenders(studio.id);
            if (studioCalenders && studioCalenders.length > 0) {
                for (var studioCalender of studioCalenders) {
                    if (studioCalender.events && studioCalender.events.length > 0) {
                        for (var event of studioCalender.events) {
                            let data = {
                                startTime: event.start,
                                endTime: event.end
                            };
                            timings.push(data);
                        }
                    }
                }
            }
            if (studioBookings && studioBookings.length > 0) {
                for (var studioBooking of studioBookings) {
                    let model = {
                        startTime: new Date(studioBooking.start),
                        endTime: new Date(studioBooking.end)
                    };
                    timings.push(model);
                }
            }
            return timings;
        });
    }
};
__decorate([
    common_1.Get('/cancleAppointments'),
    __param(0, common_1.Query('apptId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "cancelAppointments", null);
__decorate([
    common_1.Get('/studios'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "getStudioBookings", null);
__decorate([
    common_1.Get('/studios/:studioId'),
    __param(0, common_1.Param('studioId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "getAllStudioBookings", null);
__decorate([
    common_1.Get('/studio/:studioId'),
    __param(0, common_1.Param('studioId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "getAllStudioBooking", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "reserveStudio", null);
__decorate([
    common_1.Get('/users/:userId'),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "getApptsToReview", null);
__decorate([
    common_1.Post('/cancel'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "cancelAppointment", null);
__decorate([
    common_1.Post(':apptId/confirm'),
    __param(0, common_1.Param('apptId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "confirmAppointment", null);
__decorate([
    common_1.Post('/create/token'),
    __param(0, common_1.Body('cardNumber')),
    __param(1, common_1.Body('expMonth')),
    __param(2, common_1.Body('expYear')),
    __param(3, common_1.Body('cvc')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "createChatReport", null);
__decorate([
    common_1.Get('/getTimings/:studioId'),
    __param(0, common_1.Param('studioId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "getTimings", null);
AppointmentController = __decorate([
    common_1.Controller('appointments'),
    __metadata("design:paramtypes", [studio_service_1.StudioService,
        appointment_service_1.AppointmentService,
        user_service_1.UserService,
        userNotification_service_1.UserNotificationService,
        payout_service_1.PayoutService,
        paymentHistory_service_1.PaymentHistoryService,
        payment_service_1.PaymentService,
        userCard_service_1.UserCardService])
], AppointmentController);
exports.AppointmentController = AppointmentController;
//# sourceMappingURL=appointment.controller.js.map