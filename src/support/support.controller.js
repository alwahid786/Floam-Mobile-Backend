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
exports.SupportController = void 0;
const common_1 = require("@nestjs/common");
const support_service_1 = require("./support.service");
const support_dto_1 = require("./support.dto");
const user_service_1 = require("../users/user.service");
const studio_service_1 = require("../studio/studio.service");
var nodemailer = require('nodemailer');
let SupportController = class SupportController {
    constructor(supportService, userService, studioService) {
        this.supportService = supportService;
        this.userService = userService;
        this.studioService = studioService;
        this.log = new common_1.Logger('supportController');
    }
    createSupport(supportDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUser(supportDto.userId);
            const support = yield this.supportService.createSupport(supportDto);
            sendEmail('floamco1@gmail.com', user, support, null);
            return support;
        });
    }
    getAllSupports() {
        return this.supportService.getAll();
    }
    createChatReport(userId, toUserId, text) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUser(userId);
            const toUser = yield this.userService.getUser(toUserId);
            const support = {
                type: 'chat',
                text: text
            };
            sendEmail('floamco1@gmail.com', user, support, toUser);
            sendEmail('vishal@bcoder.in', user, support, toUser);
            return 'Report create has been created successfully';
        });
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [support_dto_1.supportDto]),
    __metadata("design:returntype", Promise)
], SupportController.prototype, "createSupport", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SupportController.prototype, "getAllSupports", null);
__decorate([
    common_1.Post('/chat/report'),
    __param(0, common_1.Body('userId')),
    __param(1, common_1.Body('toUserId')),
    __param(2, common_1.Body('text')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], SupportController.prototype, "createChatReport", null);
SupportController = __decorate([
    common_1.Controller('contactSupports'),
    __metadata("design:paramtypes", [support_service_1.supportService,
        user_service_1.UserService,
        studio_service_1.StudioService])
], SupportController);
exports.SupportController = SupportController;
let sendEmail = (email, user, support, toUser) => __awaiter(void 0, void 0, void 0, function* () {
    let msg = null;
    if (support.type == 'report') {
        msg = `${user.firstName} ${user.lastName} (${user.email}) has reported for the following reason :<br></br>
    description: ${support.text}`;
    }
    else if (support.type == 'feedback') {
        msg = `${user.firstName} ${user.lastName} (${user.email}) has shared the feedback. Check out the feedback :<br></br>
    description: ${support.text}`;
    }
    else if (support.type == 'chat') {
        msg = `${user.firstName} ${user.lastName} (${user.email}) has report the chat with ${toUser.firstName} ${toUser.lastName} (${toUser.email}) for show selected reason. :<br></br>
    description: ${support.text}`;
    }
    let data = {
        to: email,
        subject: 'floam App',
        html: msg,
        from: '',
    };
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: 'support@floam.co',
            pass: 'fmoowdfaheljnmsy'
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
//# sourceMappingURL=support.controller.js.map