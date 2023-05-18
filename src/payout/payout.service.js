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
exports.PayoutService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payout_entity_1 = require("./payout.entity");
const stripeTest = require('stripe')('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', {
    apiVersion: '2020-08-27'
});
const stripeProd = require('stripe')('sk_test_MEvj1NP7uAlLRMMWukEMnzV5');
let PayoutService = class PayoutService {
    constructor(PayoutServiceRepo) {
        this.PayoutServiceRepo = PayoutServiceRepo;
        this.log = new common_1.Logger('PayoutService');
    }
    createPayout(dto) {
        const { totalAmount, floamAmount, studioUserAmount, userId, appointmentId, } = dto;
        const payout = {
            totalAmount: parseFloat(totalAmount),
            floamAmount,
            studioUserAmount,
            userId,
            appointmentId,
            status: payout_entity_1.PAYOUT_STATUSES.APPROVED,
            responseData: '',
            amountSend: false,
            stripeUserPayoutId: null,
        };
        return this.PayoutServiceRepo.save(payout);
    }
    update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            let payout = yield this.PayoutServiceRepo.findOne({
                where: { id: id },
            });
            if (payout.status == 'approved') {
                return 'payout already approved.';
            }
            if (payout.status == 'rejected') {
                return 'payout already rejected.';
            }
            payout.status = body.status;
            payout = yield this.PayoutServiceRepo.save(payout);
            return payout;
        });
    }
    updateByStudio(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let payouts = yield this.PayoutServiceRepo.find({
                where: { userId: body.id, status: 'requested' }
            });
            const payout = yield Promise.all(payouts.map((payout) => __awaiter(this, void 0, void 0, function* () {
                payout.status = body.status;
                return yield this.PayoutServiceRepo.save(payout);
            })));
            return payout;
        });
    }
    getUserPayouts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.PayoutServiceRepo.find({
                where: { userId },
            });
        });
    }
    getAllPayouts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.PayoutServiceRepo.find();
        });
    }
    getAllPayoutsByFilter(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const payout = yield this.PayoutServiceRepo.find({
                where: { status: body.status },
            });
            return payout;
        });
    }
    getPayoutOfAppointment(appointmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const payout = yield this.PayoutServiceRepo.findOne({
                where: { appointmentId: appointmentId },
            });
            return payout.stripeUserPayoutId;
        });
    }
    getPayoutWithDates(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payout = yield this.PayoutServiceRepo.find({
                    where: {
                        createdAt: typeorm_2.Between(startDate, endDate),
                        status: payout_entity_1.PAYOUT_STATUSES.APPROVED,
                    },
                });
                return payout;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    createTransferringToConnectAccount(payout, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const transfer = yield stripeTest.transfers.create({
                        amount: parseInt(payout.studioUserAmount) * 100,
                        currency: 'usd',
                        destination: user.clientConnectId,
                    });
                    if (transfer) {
                        payout.stripeUserPayoutId = transfer.id;
                        payout.amountSend = true;
                        payout.responseData = JSON.stringify(transfer);
                        yield this.PayoutServiceRepo.save(payout);
                        return resolve(transfer);
                    }
                }
                catch (err) {
                    return resolve(null);
                }
            }));
        });
    }
    createPayoutToBankAccount(payout, bankDetail, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newPayout = yield stripeTest.payouts.create({
                    amount: parseInt(payout.studioUserAmount) * 100,
                    currency: 'usd',
                    destination: bankDetail.bankAccountToken,
                }, {
                    stripeAccount: user.customerId,
                });
                if (newPayout) {
                    if (newPayout) {
                        payout.stripeUserPayoutId = newPayout.id;
                        payout.amountSend = true;
                        payout.responseData = JSON.stringify(newPayout);
                        yield this.PayoutServiceRepo.save(payout);
                    }
                    return newPayout;
                }
            }
            catch (err) {
                if (err.message) {
                    throw err.message;
                }
                throw err;
            }
        });
    }
};
PayoutService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(payout_entity_1.Payout)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PayoutService);
exports.PayoutService = PayoutService;
//# sourceMappingURL=payout.service.js.map