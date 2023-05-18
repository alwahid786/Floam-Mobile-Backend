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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const appointment_service_1 = require("../appointment/appointment.service");
const studio_service_1 = require("../studio/studio.service");
const user_entity_1 = require("./user.entity");
const user_service_1 = require("./user.service");
var randomstring = require('randomstring');
var path = require('path');
var fs = require('fs');
var mustache = require('mustache');
var nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");
let UserController = class UserController {
    constructor(appointmentService, studioService, userService) {
        this.appointmentService = appointmentService;
        this.studioService = studioService;
        this.userService = userService;
        this.log = new common_1.Logger('UserController');
    }
    getUser(userId) {
        return this.userService.getUser(userId);
    }
    checkDuplication(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userService.getAll();
            const foundUser = users.find((user) => {
                return user.email === email;
            });
            if (foundUser === undefined) {
                return {
                    result: 'NO',
                };
            }
            return {
                result: 'YES',
            };
        });
    }
    getAllUser() {
        return this.userService.getAll();
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.log.log(`[DELETE][deleteUser]`);
            return yield this.userService.deleteUserAcount(id);
        });
    }
    updateUser(userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            this.log.debug(`update user route`);
            if (userInfo.id) {
                if (userInfo.password) {
                    let bcryptPassword = yield bcrypt.hash(userInfo.password, 10);
                    userInfo.password = bcryptPassword;
                }
            }
            let customAccount = yield this.userService.createCustomAccountForUser(userInfo);
            userInfo.customerId = customAccount.id;
            return this.userService.createOrUpdateUser(userInfo);
        });
    }
    getUserSessions(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("inside ger user /:id/sessions", userId);
            const user = yield this.userService.getUser(userId);
            return this.appointmentService.getBookingsForUser(user);
        });
    }
    forgot(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserFromEmail(dto.email);
            if (user) {
                let password = randomstring.generate(8).toUpperCase();
                sendPasswordToAdmin(user, password);
                let bcryptPassword = yield bcrypt.hash(password, 10);
                user.password = bcryptPassword;
                yield this.userService.createOrUpdateUser(user);
                return 'done';
            }
        });
    }
    sendPushNotification(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const { message, title, userID } = requestBody;
            let response = this.userService.sendPush(userID, message, title);
            return "Push Notification Sent!";
        });
    }
};
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    common_1.Get('/checkDuplication/:email'),
    __param(0, common_1.Param('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "checkDuplication", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUser", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    common_1.Get('/:id/sessions'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserSessions", null);
__decorate([
    common_1.Post('/forgotPassword'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "forgot", null);
__decorate([
    common_1.Post('/sendPush'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "sendPushNotification", null);
UserController = __decorate([
    common_1.Controller('users'),
    __metadata("design:paramtypes", [appointment_service_1.AppointmentService,
        studio_service_1.StudioService,
        user_service_1.UserService])
], UserController);
exports.UserController = UserController;
let sendPasswordToAdmin = (user, password) => __awaiter(void 0, void 0, void 0, function* () {
    var templatePath = path.resolve('templates/floam.html');
    var template = fs.readFileSync(templatePath, 'utf8');
    let model = {
        firstName: user.firstName,
        lastName: user.lastName,
        password: password,
    };
    var html = mustache.render(template, model);
    let data = {
        to: user.email,
        subject: 'floam App',
        html: html,
        from: '',
    };
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'support@floam.co',
            pass: 'fmoowdfaheljnmsy',
        },
    });
    try {
        let info = yield transporter.sendMail(data);
        console.log(info);
    }
    catch (err) {
        console.log(err);
    }
});
//# sourceMappingURL=user.controller.js.map