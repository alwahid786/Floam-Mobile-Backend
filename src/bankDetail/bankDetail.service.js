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
exports.BankDetailService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const stripeTest = require('stripe')('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');
const stripeProd = require('stripe')('sk_test_MEvj1NP7uAlLRMMWukEMnzV5');
const typeorm_2 = require("typeorm");
const bankDetail_entity_1 = require("./bankDetail.entity");
let BankDetailService = class BankDetailService {
    constructor(BankDetailServiceRepo) {
        this.BankDetailServiceRepo = BankDetailServiceRepo;
        this.log = new common_1.Logger('BankDetailService');
    }
    createEntry(stripeBankToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, bankName, routingNumber, accountNumber, userId, bankToken, bankAccountToken, } = stripeBankToken;
                const bankDetail = {
                    name,
                    bankName,
                    routingNumber,
                    accountNumber,
                    userId,
                    bankToken,
                    bankAccountToken,
                };
                return yield this.BankDetailServiceRepo.save(bankDetail);
            }
            catch (err) {
                throw err;
            }
        });
    }
    getBankDetailsByUser(userId) {
        return this.BankDetailServiceRepo.find({
            where: { userId },
        });
    }
    deleteBankDetail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const bankDetail = yield this.BankDetailServiceRepo.findOne({
                where: { id: id },
            });
            if (!bankDetail) {
                return 'bankDetail not found';
            }
            yield this.BankDetailServiceRepo.delete(bankDetail.id);
            return;
        });
    }
    update(id, bankDetailDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, bankName, routingNumber, accountNumber, userId, bankToken, bankAccountToken, } = bankDetailDto;
            let bankDetail = yield this.BankDetailServiceRepo.update({ id: id }, {
                name,
                bankName,
                routingNumber,
                accountNumber,
                userId,
                bankToken,
                bankAccountToken,
            });
            return bankDetail;
        });
    }
    createBankToken(data, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield stripeTest.tokens.create({
                    bank_account: {
                        country: 'US',
                        currency: 'usd',
                        account_holder_name: data.name,
                        account_holder_type: 'individual',
                        routing_number: data.routingNumber,
                        account_number: data.accountNumber,
                    },
                });
                console.log('token :>> ', token);
                if (token && token.id) {
                    let bankAccount = yield stripeTest.accounts.createExternalAccount(user.customerId, { external_account: token.id });
                    console.log('bankAccount :>> ', bankAccount);
                    if (bankAccount) {
                        data.bankToken = token.id;
                        data.bankAccountToken = bankAccount.id;
                        return data;
                    }
                }
            }
            catch (err) {
                throw err.message;
            }
        });
    }
    getEntry(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let bankDetail = yield this.BankDetailServiceRepo.findOne(userId);
            if (!bankDetail) {
                return 'not found';
            }
            return bankDetail;
        });
    }
};
BankDetailService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(bankDetail_entity_1.BankDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BankDetailService);
exports.BankDetailService = BankDetailService;
//# sourceMappingURL=bankDetail.service.js.map