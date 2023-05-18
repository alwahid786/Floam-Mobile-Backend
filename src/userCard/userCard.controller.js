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
exports.UserCardController = void 0;
const common_1 = require("@nestjs/common");
const userCard_service_1 = require("./userCard.service");
const userCard_dto_1 = require("./userCard.dto");
const user_service_1 = require("../users/user.service");
let UserCardController = class UserCardController {
    constructor(userCardService, userService) {
        this.userCardService = userCardService;
        this.userService = userService;
        this.log = new common_1.Logger('UserCardController');
    }
    createUserCard(userCardDto) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userService.getUser(userCardDto.userId);
            const userCard = yield this.userCardService.createCard(userCardDto);
            return userCard;
        });
    }
    getUserCards(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.log.log('[GET] Card which belong to user');
            yield this.userService.getUser(userId);
            const userCards = yield this.userCardService.getCardsByUser(userId);
            return (userCards.reverse());
        });
    }
    removeCardInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.log.log(`[DELETE][removeCardInfo]`);
            yield this.userCardService.deleteCard(id);
            return 'Card Deleted.';
        });
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userCard_dto_1.userCardDto]),
    __metadata("design:returntype", Promise)
], UserCardController.prototype, "createUserCard", null);
__decorate([
    common_1.Get('/users/:userId'),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserCardController.prototype, "getUserCards", null);
__decorate([
    common_1.Delete('/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserCardController.prototype, "removeCardInfo", null);
UserCardController = __decorate([
    common_1.Controller('userCards'),
    __metadata("design:paramtypes", [userCard_service_1.UserCardService,
        user_service_1.UserService])
], UserCardController);
exports.UserCardController = UserCardController;
//# sourceMappingURL=userCard.controller.js.map