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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const payment_service_1 = require("./payment.service");
let PaymentController = class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
        this.log = new common_1.Logger('PaymentController');
    }
    getCardsInfoForUser(userId) {
        this.log.log(`[GET][getCardsInfoForUser]`);
        return this.paymentService.getCards(userId);
    }
    registerCardInfo(data) {
        this.log.log(`[POST][registerCardInfo]`);
        return this.paymentService.registerCard(data);
    }
    removeCardInfo(userId, cardId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.log.log(`[DELETE][removeCardInfo]`);
            yield this.paymentService.deleteCard(userId, cardId);
            return 'Card Deleted.';
        });
    }
    genratePaymentLink(amount) {
        this.log.log(`[GET][genratePaymentLink]`);
        return "https://stripe.com/v1/charges?payment_intent=pi_1Drabb2eZvKYlo2CRZoK3NG4";
    }
};
__decorate([
    common_1.Get('/cards/users/:userId'),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "getCardsInfoForUser", null);
__decorate([
    common_1.Post('/cards'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "registerCardInfo", null);
__decorate([
    common_1.Delete('/cards/users/:userId'),
    __param(0, common_1.Param('userId')),
    __param(1, common_1.Body('cardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "removeCardInfo", null);
__decorate([
    common_1.Post('/create_payment_link'),
    __param(0, common_1.Body('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "genratePaymentLink", null);
PaymentController = __decorate([
    common_1.Controller('payments'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentController);
exports.PaymentController = PaymentController;
//# sourceMappingURL=payment.controller.js.map