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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../users/user.entity");
const user_service_1 = require("../users/user.service");
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    login(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.authService.signPayload(dto);
            const user = yield this.userService.getByLoginInfo(dto.email, dto.password);
            return { user, token };
        });
    }
    registerUser(registration) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Register function called');
            const user = Object.assign(Object.assign({}, registration), { email: registration.email.toLowerCase() });
            const userList = yield this.userService.getAll();
            const existingUser = userList.find((u) => {
                return u.email === user.email;
            });
            if (existingUser === undefined) {
                console.log('register error');
                return { user: existingUser, token: existingUser.pushToken };
            }
            const createdUser = yield this.userService.registerUser(user);
            const token = yield this.authService.signPayload({
                email: createdUser.email,
                password: createdUser.password,
            });
            return { user: createdUser, token };
        });
    }
    v2RegisterUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Register V2 function called');
            const user = yield this.userService.getUser(userId);
            user.status = user_entity_1.USER_STATUS.ACTIVE;
            const updatedUser = yield this.userService.createOrUpdateUser(user);
            const token = yield this.authService.signPayload({
                email: updatedUser.email,
                password: updatedUser.password,
            });
            return { user: updatedUser, token };
        });
    }
    registerSocialUser(registration) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Register Social function called');
            if (registration.loginType == 'facebook') {
                const user = Object.assign(Object.assign({}, registration), { facebookId: registration.facebookId });
                const userList = yield this.userService.getAll();
                const existingUser = userList.find((u) => {
                    return u.facebookId === user.facebookId;
                });
                if (existingUser === undefined) {
                    const createdUser = yield this.userService.registerSocialUser(user);
                    const token = yield this.authService.signFacebookPayload({
                        facebookId: createdUser.facebookId,
                        loginType: createdUser.loginType,
                    });
                    createdUser.isNewUser = true;
                    return { user: createdUser, token };
                }
                else if (existingUser !== undefined) {
                    console.log('existing user');
                    const token = yield this.authService.signFacebookPayload({
                        facebookId: existingUser.facebookId,
                        loginType: existingUser.loginType,
                    });
                    existingUser.isNewUser = false;
                    return { user: existingUser, token: token };
                }
            }
            else if (registration.loginType == 'google') {
                const user = Object.assign(Object.assign({}, registration), { googleId: registration.googleId });
                const userList = yield this.userService.getAll();
                const existingUser = userList.find((u) => {
                    return u.googleId === user.googleId;
                });
                if (existingUser === undefined) {
                    const createdUser = yield this.userService.registerSocialUser(user);
                    const token = yield this.authService.signGooglePayload({
                        googleId: createdUser.googleId,
                        loginType: createdUser.loginType,
                    });
                    console.log(createdUser);
                    createdUser.isNewUser = true;
                    return { user: createdUser, token };
                }
                else if (existingUser !== undefined) {
                    console.log('existing user');
                    const token = yield this.authService.signGooglePayload({
                        googleId: existingUser.googleId,
                        loginType: existingUser.loginType,
                    });
                    existingUser.isNewUser = false;
                    return { user: existingUser, token: token };
                }
            }
            else if (registration.loginType == 'apple') {
                const user = Object.assign(Object.assign({}, registration), { appleId: registration.appleId });
                const userList = yield this.userService.getAll();
                const existingUser = userList.find((u) => {
                    return u.appleId === user.appleId;
                });
                if (existingUser === undefined) {
                    const createdUser = yield this.userService.registerSocialUser(user);
                    const token = yield this.authService.signApplePayload({
                        appleId: createdUser.appleId,
                        loginType: createdUser.loginType,
                    });
                    console.log(createdUser);
                    createdUser.isNewUser = true;
                    return { user: createdUser, token };
                }
                else if (existingUser !== undefined) {
                    console.log('existing user');
                    const token = yield this.authService.signApplePayload({
                        appleId: existingUser.appleId,
                        loginType: existingUser.loginType,
                    });
                    existingUser.isNewUser = false;
                    return { user: existingUser, token: token };
                }
            }
        });
    }
};
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    common_1.Post('/register'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerUser", null);
__decorate([
    common_1.Post('/v2/register/:userId'),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "v2RegisterUser", null);
__decorate([
    common_1.Post('/register/social'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerSocialUser", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map