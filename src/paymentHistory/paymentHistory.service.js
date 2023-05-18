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
exports.PaymentHistoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const moment = require("moment");
const typeorm_2 = require("typeorm");
const paymentHistory_entity_1 = require("./paymentHistory.entity");
const stripeTest = require('stripe')('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');
const stripeProd = require('stripe')('sk_test_MEvj1NP7uAlLRMMWukEMnzV5');
let PaymentHistoryService = class PaymentHistoryService {
    constructor(paymentHistoryRepo) {
        this.paymentHistoryRepo = paymentHistoryRepo;
        this.log = new common_1.Logger('paymentHistoryService');
        this.createRefundLog = (user, studioUserId, charge, total, type, artistUserAmount, apptId) => __awaiter(this, void 0, void 0, function* () {
            let artistUser = null;
            let studioUser = null;
            if (type == 'refund') {
                if (charge && charge.amount) {
                    artistUser = {
                        userId: user.id,
                        amount: artistUserAmount,
                        transactionId: charge.id,
                        status: 'succeeded',
                        text: 'amount refunded',
                        appointmentId: apptId
                    };
                    studioUser = {
                        userId: studioUserId,
                        amount: total,
                        transactionId: charge.id,
                        status: 'succeeded',
                        text: 'amount refunded',
                        appointmentId: apptId
                    };
                }
                yield this.paymentHistoryRepo.save(studioUser);
                yield this.paymentHistoryRepo.save(artistUser);
                return;
            }
            else if (type == 'notRefund') {
                if (charge && charge.amount) {
                    artistUser = {
                        userId: user.id,
                        amount: total,
                        transactionId: charge.id,
                        status: 'succeeded',
                        text: 'amount refunded',
                        appointmentId: apptId
                    };
                }
                return this.paymentHistoryRepo.save(artistUser);
            }
        });
        this.createCharge = (data, uniqueKey) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                stripeTest.charges.create({
                    amount: data.total * 100,
                    currency: 'usd',
                    source: data.cardToken,
                    description: 'charge for appointment',
                    metadata: { order_id: data.studioId },
                }, {
                    idempotency_key: uniqueKey,
                }, function (err, charge) {
                    if (err) {
                        return reject(err.message);
                    }
                    return resolve(charge);
                });
            }));
        });
        this.createCardToken = (data) => __awaiter(this, void 0, void 0, function* () {
            const token = yield stripeTest.tokens.create({
                card: {
                    number: data.cardNumber,
                    exp_month: data.expMonth,
                    exp_year: data.expYear,
                    cvc: data.cvc,
                },
            });
            return (token);
        });
        this.getDayEarning = (date, userId) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var startMonth = moment(date).startOf("day");
                    var endMonth = moment(date).endOf('day');
                    let payments = yield this.paymentHistoryRepo.find({
                        where: {
                            createdAt: typeorm_2.Between(startMonth, endMonth),
                            userId: userId
                        }
                    });
                    let totalAmount = 0;
                    if (payments.length > 0) {
                        for (var payment of payments) {
                            totalAmount = totalAmount + payment.amount;
                        }
                    }
                    return resolve(totalAmount);
                }
                catch (err) {
                    return resolve(null);
                }
            }));
        });
        this.getWeekEarning = (date, userId) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var startMonth = moment(date).startOf("week");
                    var endMonth = moment(date).endOf('week');
                    let payments = yield this.paymentHistoryRepo.find({
                        where: {
                            createdAt: typeorm_2.Between(startMonth, endMonth),
                            userId: userId
                        }
                    });
                    let totalAmount = 0;
                    if (payments.length > 0) {
                        for (var payment of payments) {
                            totalAmount = totalAmount + payment.amount;
                        }
                    }
                    return resolve(totalAmount);
                }
                catch (err) {
                    return resolve(null);
                }
            }));
        });
        this.getTodayPayments = () => __awaiter(this, void 0, void 0, function* () {
            const startDate = moment().startOf("day");
            const endDate = moment().endOf("day");
            const payments = yield this.paymentHistoryRepo.find({
                where: {
                    createdAt: typeorm_2.Between(startDate, endDate)
                }
            });
            return payments.length;
        });
        this.getMonthEarning = (date, userId) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var startMonth = moment(date).startOf("month");
                    var endMonth = moment(date).endOf('month');
                    let payments = yield this.paymentHistoryRepo.find({
                        where: {
                            createdAt: typeorm_2.Between(startMonth, endMonth),
                            userId: userId
                        }
                    });
                    let totalAmount = 0;
                    if (payments.length > 0) {
                        for (var payment of payments) {
                            totalAmount = totalAmount + payment.amount;
                        }
                    }
                    return resolve(totalAmount);
                }
                catch (err) {
                    return resolve(null);
                }
            }));
        });
        this.getAllPayments = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.paymentHistoryRepo.find({});
        });
        this.createRefund = (data) => __awaiter(this, void 0, void 0, function* () {
            const refund = yield stripeTest.refunds.create({
                charge: data.transactionId,
            });
            return (refund);
        });
    }
    createPaymentLog(user, payment_intent, total, type, appointmentId) {
        let data = null;
        if (payment_intent) {
            data = {
                userId: user.id,
                amount: total,
                transactionId: payment_intent,
                status: 'paid',
                text: 'amount paid'
            };
        }
        else if (type) {
            data = {
                userId: user.id,
                amount: total,
                transactionId: null,
                status: 'succeeded',
                text: 'amount received',
                appointmentId: appointmentId
            };
        }
        else {
            data = {
                userId: user.id,
                amount: total,
                transactionId: null,
                status: 'failed',
                text: 'amount failed'
            };
        }
        return this.paymentHistoryRepo.save(data);
    }
    saveAppointmentId(paymentHistory) {
        return this.paymentHistoryRepo.save(paymentHistory);
    }
    getPaymentByUser(userId) {
        return this.paymentHistoryRepo.find({
            where: { userId }
        });
    }
    getPaymentByTransactionId(appointmentId) {
        return this.paymentHistoryRepo.findOne({
            where: { appointmentId: appointmentId, status: 'paid' }
        });
    }
    getEarnings(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            let day = [];
            let week = [];
            let month = [];
            let ytd = [];
            let model = {};
            var date7 = moment(new Date());
            var date6 = moment(new Date()).subtract(1, "day");
            var date5 = moment(new Date()).subtract(2, "day");
            var date4 = moment(new Date()).subtract(3, "day");
            var date3 = moment(new Date()).subtract(4, "day");
            var date2 = moment(new Date()).subtract(5, "day");
            var date1 = moment(new Date()).subtract(6, "day");
            const day1 = yield this.getDayEarning(date1, userId);
            model = {
                day: moment(date1).format('D/M/YY'),
                earnings: day1,
                label: day1
            };
            day.push(model);
            const day2 = yield this.getDayEarning(date2, userId);
            model = {
                day: moment(date2).format('D/M/YY'),
                earnings: day2,
                label: day2
            };
            day.push(model);
            const day3 = yield this.getDayEarning(date3, userId);
            model = {
                day: moment(date3).format('D/M/YY'),
                earnings: day3,
                label: day3
            };
            day.push(model);
            const day4 = yield this.getDayEarning(date4, userId);
            model = {
                day: moment(date4).format('D/M/YY'),
                earnings: day4,
                label: day4
            };
            day.push(model);
            const day5 = yield this.getDayEarning(date5, userId);
            model = {
                day: moment(date5).format('D/M/YY'),
                earnings: day5,
                label: day5
            };
            day.push(model);
            const day6 = yield this.getDayEarning(date6, userId);
            model = {
                day: moment(date6).format('D/M/YY'),
                earnings: day6,
                label: day6
            };
            day.push(model);
            const day7 = yield this.getDayEarning(date7, userId);
            model = {
                day: moment(date7).format('D/M/YY'),
                earnings: day7,
                label: day7
            };
            day.push(model);
            var date4 = moment(new Date());
            var date3 = moment(new Date()).subtract(1, "week");
            var date2 = moment(new Date()).subtract(2, "week");
            var date1 = moment(new Date()).subtract(3, "week");
            const week1 = yield this.getWeekEarning(date1, userId);
            model = {
                day: moment(date1).format('D/M/YY'),
                earnings: week1,
                label: week1
            };
            week.push(model);
            const week2 = yield this.getWeekEarning(date2, userId);
            model = {
                day: moment(date2).format('D/M/YY'),
                earnings: week2,
                label: week2
            };
            week.push(model);
            const week3 = yield this.getWeekEarning(date3, userId);
            model = {
                day: moment(date3).format('D/M/YY'),
                earnings: week3,
                label: week3
            };
            week.push(model);
            const week4 = yield this.getWeekEarning(date4, userId);
            model = {
                day: moment(date4).format('D/M/YY'),
                earnings: week4,
                label: week4
            };
            week.push(model);
            var date3 = moment(new Date());
            var date2 = moment(new Date()).subtract(1, "month");
            var date1 = moment(new Date()).subtract(2, "month");
            const month1 = yield this.getMonthEarning(date1, userId);
            model = {
                day: moment(date1).format('MMM'),
                earnings: month1,
                label: month1
            };
            month.push(model);
            const month2 = yield this.getMonthEarning(date2, userId);
            model = {
                day: moment(date2).format('MMM'),
                earnings: month2,
                label: month2
            };
            month.push(model);
            const month3 = yield this.getMonthEarning(date3, userId);
            model = {
                day: moment(date3).format('MMM'),
                earnings: month3,
                label: month3
            };
            month.push(model);
            const payments = yield this.getPaymentByUser(userId);
            var totalAmount = 0;
            if (payments.length > 0) {
                for (var payment of payments) {
                    totalAmount = totalAmount + payment.amount;
                }
            }
            model = {
                day: null,
                earnings: totalAmount
            };
            ytd.push(model);
            data = {
                day: day,
                week: week,
                month: month,
                ytd: ytd
            };
            return data;
        });
    }
};
PaymentHistoryService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(paymentHistory_entity_1.PaymentHistory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PaymentHistoryService);
exports.PaymentHistoryService = PaymentHistoryService;
//# sourceMappingURL=paymentHistory.service.js.map