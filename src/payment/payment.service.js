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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const payment_repository_1 = require("./payment.repository");
const stripeClient_1 = require("./stripeClient");
let PaymentService = class PaymentService {
    constructor(paymentRepo) {
        this.paymentRepo = paymentRepo;
        this.log = new common_1.Logger('PaymentService');
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const stripeCustomerId = yield stripeClient_1.createUserInStripe(user);
            const payment = {
                stripeCustomerId,
                userId: user.id,
                cards: [],
            };
            return this.paymentRepo.save(payment);
        });
    }
    deleteCard(userId, cardId) {
        return __awaiter(this, void 0, void 0, function* () {
            const payment = yield this.paymentRepo.getByUserId(userId);
            payment.cards = payment.cards.filter(card => card.cardId !== cardId);
            return yield this.paymentRepo.save(payment);
        });
    }
    processPayment(userId, amount) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    registerCard(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { location, userId, isDefault } = data;
            const payment = yield this.paymentRepo.getByUserId(userId);
            if (!payment) {
                this.log.error(`User '${userId}' payment not found.`);
                throw new Error('Something went wrong.');
            }
            const tokenCreateParams = {
                card: {
                    name: data.name,
                    number: data.number,
                    exp_month: data.expMonth,
                    exp_year: data.expYear,
                    cvc: data.cvc,
                    address_city: location.city,
                    address_line1: location.addressOne,
                    address_line2: location.addressTwo,
                    address_state: location.state,
                    address_country: 'US',
                    address_zip: location.zipCode,
                }
            };
            try {
                const cardToken = yield stripeClient_1.default.tokens.create(tokenCreateParams);
                const source = yield stripeClient_1.default.customers.createSource(payment.stripeCustomerId, { source: cardToken.id });
                payment.cards.push({ cardId: source.id, isDefault });
                return yield this.paymentRepo.save(payment);
            }
            catch (e) {
                this.log.error(e);
                throw e;
            }
        });
    }
    getCards(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const payment = yield this.paymentRepo.findOne({
                where: { userId }
            });
            const response = [];
            if (payment && payment.cards) {
                for (const pCard of payment.cards) {
                    const card = yield this.transformToCard(payment.stripeCustomerId, pCard);
                    response.push(card);
                }
            }
            return response;
        });
    }
    transformToCard(customerId, pCard) {
        return __awaiter(this, void 0, void 0, function* () {
            const source = yield stripeClient_1.default.customers.retrieveSource(customerId, pCard.cardId);
            return {
                brand: source.brand,
                last4: source.last4,
                expMonth: source.exp_month,
                expYear: source.exp_year,
                isDefault: pCard.isDefault,
                cardId: pCard.cardId,
            };
        });
    }
};
PaymentService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [payment_repository_1.PaymentRepository])
], PaymentService);
exports.PaymentService = PaymentService;
//# sourceMappingURL=payment.service.js.map