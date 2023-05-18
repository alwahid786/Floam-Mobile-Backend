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
exports.StudioController = void 0;
const common_1 = require("@nestjs/common");
const review_service_1 = require("../review/review.service");
const user_service_1 = require("../users/user.service");
const ParseStudioFilterPipe_1 = require("./ParseStudioFilterPipe");
const studio_service_1 = require("./studio.service");
const studio_status_1 = require("./studio.status");
const userNotification_service_1 = require("../userNotification/userNotification.service");
const appointment_service_1 = require("../appointment/appointment.service");
let StudioController = class StudioController {
    constructor(userService, reviewService, studioService, appointmentService, UserNotificationService) {
        this.userService = userService;
        this.reviewService = reviewService;
        this.studioService = studioService;
        this.appointmentService = appointmentService;
        this.UserNotificationService = UserNotificationService;
        this.log = new common_1.Logger('StudioController');
    }
    getStudio(studioId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.studioService.getStudioDto(studioId);
        });
    }
    getUserStudios(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.log.log('[GET] studios which belong to user');
            const user = yield this.userService.getUser(userId);
            const userStudios = yield this.studioService.getStudiosByUser(user);
            return this.studioService.transformToDtos(userStudios);
        });
    }
    getStudiosForAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.appointmentService.getAllStudiosForAdmin();
            if (data.length == 0) {
                return [];
            }
            const studios = yield this.studioService.getStudiosByIds(data);
            return studios;
        });
    }
    getStudios(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            this.log.debug(`getStudios - filter: ${JSON.stringify(filter)}`);
            if (JSON.stringify(filter) === JSON.stringify({}) || (filter === null || filter === void 0 ? void 0 : filter.fetchAll)) {
                return this.studioService.getAllStudios();
            }
            return this.studioService.getStudiosWithFilter(filter);
        });
    }
    getAppointStudio() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("hiit ");
            const studios = yield this.studioService.getAllStudios();
            let data = [];
            yield Promise.all(studios.map((studio) => __awaiter(this, void 0, void 0, function* () {
                const appointment = yield this.appointmentService.getStudioByStudioId(studio.id);
                if (appointment.length > 0) {
                    data.push(studio);
                }
                return null;
            })));
            console.log('data.length :>> ', data.length);
            return data;
        });
    }
    getStudioReviews(studioId) {
        return __awaiter(this, void 0, void 0, function* () {
            const studio = yield this.studioService.getStudio(studioId);
            const reviews = yield this.reviewService.getReviewsByStudio(studio);
            return (reviews);
        });
    }
    publishStudio(studioId, isLive) {
        return __awaiter(this, void 0, void 0, function* () {
            const studio = yield this.studioService.getStudio(studioId);
            studio.isLive = isLive;
            yield this.studioService.createOrUpdateStudio(studio);
            return this.studioService.getStudioDto(studioId);
        });
    }
    approveStudio(studioId, status, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            const studio = yield this.studioService.getStudio(studioId);
            studio.status = studio_status_1.STUDIO_STATUS[status];
            studio.isLive = studio.status === studio_status_1.STUDIO_STATUS.APPROVED;
            if (status == 'APPROVED') {
                studio.rejected_reason = "";
                const user = yield this.userService.getUser(studio.userId);
                const text = `Your \"${studio.name}\" studio was approved`;
                yield this.UserNotificationService.createNotification(text, user.id, 'studioApproved', studio.id);
            }
            else if (status == 'PENDING_APPROVAL') {
                studio.rejected_reason = "";
                const user = yield this.userService.getUser(studio.userId);
                const text = `The \"${studio.name}\" studio is under review`;
                yield this.UserNotificationService.createNotification(text, user.id, 'studioPending', studio.id);
                yield this.userService.sendPush(user.id, text, "Studio In Review");
            }
            else if (status == 'REJECTED') {
                studio.rejected_reason = reason;
                const user = yield this.userService.getUser(studio.userId);
                const text = `Your \"${studio.name}\" studio was rejected: \"${reason}\"`;
                yield this.UserNotificationService.createNotification(text, user.id, 'studioRejected', studio.id);
                yield this.userService.sendPush(user.id, text, "Studio Is Rejected");
            }
            yield this.studioService.createOrUpdateStudio(studio);
            return this.studioService.getStudioDto(studioId);
        });
    }
    registerStudio(studioReg) {
        return __awaiter(this, void 0, void 0, function* () {
            this.log.debug('******* studio reg *******');
            this.log.debug(studioReg);
            this.log.debug('******* studio reg *******\n\n');
            const user = yield this.userService.getUser(studioReg.userId);
            let studio = Object.assign(Object.assign({ user }, studioReg), { name: studioReg.name, description: studioReg.description, rejected_reason: studioReg.rejected_reason, rules: studioReg.rules, price: studioReg.price, capacity: studioReg.capacity, status: studio_status_1.STUDIO_STATUS.PENDING_APPROVAL, amenities: studioReg.amenities, location: Object.assign({}, studioReg.location), isLive: false, addOns: studioReg.addOns, depositRequired: studioReg.depositRequired, minSessionLength: studioReg.minSessionLength });
            if (studioReg.studioId) {
                studio = yield this.studioService.getStudio(studioReg.studioId);
                studioReg.status = studio_status_1.STUDIO_STATUS.PENDING_APPROVAL;
                const toSave = this.mergeWithEntity(studioReg, studio);
                studio = yield this.studioService.createOrUpdateStudio(toSave);
                return this.studioService.getStudioDto(studio.id);
            }
            studio = yield this.studioService.createOrUpdateStudio(studio);
            return this.studioService.getStudioDto(studio.id);
        });
    }
    saveStudioDraft(studioReg) {
        return __awaiter(this, void 0, void 0, function* () {
            this.log.log('\n[POST] save studio as draft');
            this.log.log(studioReg);
            this.log.log('[POST] save studio as draft\n');
            let studio = Object.assign(Object.assign({}, studioReg), { name: null, status: studio_status_1.STUDIO_STATUS.DRAFT, description: null, rejected_reason: null, rules: null, price: 0, capacity: 0, isLive: false, amenities: [], location: null, user: null, addOns: [], depositRequired: false });
            if (studioReg.studioId) {
                studio = yield this.studioService.getStudio(studioReg.studioId);
            }
            else {
                studio.user = yield this.userService.getUser(studioReg.userId);
            }
            const toSave = this.mergeWithEntity(studioReg, studio);
            const draftedStudio = yield this.studioService.createOrUpdateStudio(toSave);
            return this.studioService.transformToDto(draftedStudio);
        });
    }
    flagStudio(studioId, userId, text) {
        this.log.debug(`[flag] studio: ${studioId}, user: ${userId}`);
        return this.studioService.flagStudio(userId, studioId, text);
    }
    hasActiveStudio(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUser(userId);
            return this.studioService.hasActiveStudio(user);
        });
    }
    mergeWithEntity(studioReg, studio) {
        const keysToUpdate = Object.keys(studioReg);
        const studioKeys = Object.keys(studio);
        for (const key of keysToUpdate) {
            if (studioKeys.includes(key)) {
                studio[key] = studioReg[key];
            }
        }
        return studio;
    }
};
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudioController.prototype, "getStudio", null);
__decorate([
    common_1.Get('users/:userId'),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudioController.prototype, "getUserStudios", null);
__decorate([
    common_1.Post('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudioController.prototype, "getStudiosForAdmin", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Query(ParseStudioFilterPipe_1.ParseStudioFilterPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudioController.prototype, "getStudios", null);
__decorate([
    common_1.Post('temp'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudioController.prototype, "getAppointStudio", null);
__decorate([
    common_1.Get('reviews/:studioId'),
    __param(0, common_1.Param('studioId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudioController.prototype, "getStudioReviews", null);
__decorate([
    common_1.Post('/:studioId/publish'),
    __param(0, common_1.Param('studioId')),
    __param(1, common_1.Body('isLive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], StudioController.prototype, "publishStudio", null);
__decorate([
    common_1.Post('/:studioId/:status'),
    __param(0, common_1.Param('studioId')),
    __param(1, common_1.Param('status')),
    __param(2, common_1.Body('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], StudioController.prototype, "approveStudio", null);
__decorate([
    common_1.Post('/register'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudioController.prototype, "registerStudio", null);
__decorate([
    common_1.Post('/draft'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudioController.prototype, "saveStudioDraft", null);
__decorate([
    common_1.Post(':studioId/users/:userId/flag'),
    __param(0, common_1.Param('studioId')),
    __param(1, common_1.Param('userId')),
    __param(2, common_1.Body('text')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], StudioController.prototype, "flagStudio", null);
__decorate([
    common_1.Post('/users/:userId/active'),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudioController.prototype, "hasActiveStudio", null);
StudioController = __decorate([
    common_1.Controller('studios'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        review_service_1.ReviewService,
        studio_service_1.StudioService,
        appointment_service_1.AppointmentService,
        userNotification_service_1.UserNotificationService])
], StudioController);
exports.StudioController = StudioController;
//# sourceMappingURL=studio.controller.js.map