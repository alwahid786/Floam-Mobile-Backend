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
exports.UserBankDetailService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const userBankDetail_entity_1 = require("./userBankDetail.entity");
let UserBankDetailService = class UserBankDetailService {
    constructor(UserBankDetailServiceRepo) {
        this.UserBankDetailServiceRepo = UserBankDetailServiceRepo;
        this.log = new common_1.Logger('UserBankDetailService');
    }
    createUserBankDetails(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bankDetails = {
                    name: body.name,
                    bankName: body.bankName,
                    routingNumber: body.routingNumber,
                    accountNumber: body.accountNumber,
                    state: body.state,
                    city: body.city,
                    userId: body.userId,
                };
                return yield this.UserBankDetailServiceRepo.save(bankDetails);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getBankDetails(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(userId);
            const bankDetails = yield this.UserBankDetailServiceRepo.find({ where: { userId: userId } });
            console.log(bankDetails);
            if (!bankDetails) {
                throw new Error("bank details not found");
            }
            return bankDetails;
        });
    }
    editBankDetails(body, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, bankName, accountNumber, routingNumber, state, city } = body;
                const details = yield this.UserBankDetailServiceRepo.update({ id: id }, {
                    name,
                    bankName,
                    accountNumber,
                    routingNumber,
                    state,
                    city
                });
                return details;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteBankDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getDetails = yield this.UserBankDetailServiceRepo.find({ id: id });
                if (!getDetails) {
                    throw new Error("bank details not found");
                }
                return yield this.UserBankDetailServiceRepo.delete(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
};
UserBankDetailService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(userBankDetail_entity_1.UserBankDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserBankDetailService);
exports.UserBankDetailService = UserBankDetailService;
//# sourceMappingURL=userBankDetail.service.js.map