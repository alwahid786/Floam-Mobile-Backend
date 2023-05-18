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
exports.BankDetailController = void 0;
const common_1 = require("@nestjs/common");
const bankDetail_service_1 = require("./bankDetail.service");
const bankDetail_dto_1 = require("./bankDetail.dto");
const user_service_1 = require("../users/user.service");
let BankDetailController = class BankDetailController {
    constructor(bankDetailService, userService) {
        this.bankDetailService = bankDetailService;
        this.userService = userService;
        this.log = new common_1.Logger('BankDetailController');
    }
    createBankDetail(bankDetailDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this.userService.getUser(bankDetailDto.userId);
                const newBankDetailDto = yield this.bankDetailService.createBankToken(bankDetailDto, user);
                const bankDetail = yield this.bankDetailService.createEntry(newBankDetailDto);
                return bankDetail;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getBankDetails(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.log.log('[GET] bankDetail which belong to user');
            yield this.userService.getUser(userId);
            const bankDetails = yield this.bankDetailService.getBankDetailsByUser(userId);
            return bankDetails.reverse();
        });
    }
    removeCardInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.log.log(`[DELETE][removeBankDetailInfo]`);
            yield this.bankDetailService.deleteBankDetail(id);
            return 'entry Deleted.';
        });
    }
    updateBankDetail(id, bankDetailDto) {
        this.log.log(`processing update...`);
        return this.bankDetailService.update(id, bankDetailDto);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bankDetail_dto_1.BankDetailDto]),
    __metadata("design:returntype", Promise)
], BankDetailController.prototype, "createBankDetail", null);
__decorate([
    common_1.Get('/users/:userId'),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BankDetailController.prototype, "getBankDetails", null);
__decorate([
    common_1.Delete('/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BankDetailController.prototype, "removeCardInfo", null);
__decorate([
    common_1.Post(':id/update'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, bankDetail_dto_1.BankDetailDto]),
    __metadata("design:returntype", Promise)
], BankDetailController.prototype, "updateBankDetail", null);
BankDetailController = __decorate([
    common_1.Controller('bankDetails'),
    __metadata("design:paramtypes", [bankDetail_service_1.BankDetailService,
        user_service_1.UserService])
], BankDetailController);
exports.BankDetailController = BankDetailController;
//# sourceMappingURL=bankDetail.controller.js.map