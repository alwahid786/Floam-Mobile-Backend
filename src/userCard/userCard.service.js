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
exports.UserCardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const paymentHistory_service_1 = require("../paymentHistory/paymentHistory.service");
const typeorm_2 = require("typeorm");
const userCard_entity_1 = require("./userCard.entity");
let UserCardService = class UserCardService {
    constructor(UserCardServiceRepo, paymentHistoryService) {
        this.UserCardServiceRepo = UserCardServiceRepo;
        this.paymentHistoryService = paymentHistoryService;
        this.log = new common_1.Logger('UserCardService');
        this.createCard = (dto) => __awaiter(this, void 0, void 0, function* () {
            const token = yield this.paymentHistoryService.createCardToken(dto);
            const data = {
                name: dto.name,
                cardNumber: dto.cardNumber,
                expMonth: dto.expMonth,
                expYear: dto.expYear,
                userId: dto.userId,
                brand: token.card.brand,
                cardToken: token.id
            };
            return this.UserCardServiceRepo.save(data);
        });
    }
    getCardsByUser(userId) {
        return this.UserCardServiceRepo.find({
            where: { userId }
        });
    }
    deleteCard(cardId) {
        return __awaiter(this, void 0, void 0, function* () {
            const card = yield this.UserCardServiceRepo.findOne({ where: { id: cardId } });
            if (!card) {
                return 'user card not found';
            }
            yield this.UserCardServiceRepo.delete(card.id);
            return;
        });
    }
    getUserCard(cardId) {
        return this.UserCardServiceRepo.findOne({
            where: { id: cardId }
        });
    }
};
UserCardService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(userCard_entity_1.UserCard)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        paymentHistory_service_1.PaymentHistoryService])
], UserCardService);
exports.UserCardService = UserCardService;
//# sourceMappingURL=userCard.service.js.map