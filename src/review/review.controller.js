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
exports.ReviewController = void 0;
const common_1 = require("@nestjs/common");
const appointment_service_1 = require("../appointment/appointment.service");
const studio_service_1 = require("../studio/studio.service");
const user_service_1 = require("../users/user.service");
const review_entity_1 = require("./review.entity");
const review_service_1 = require("./review.service");
let ReviewController = class ReviewController {
    constructor(reviewService, studioService, userService, apptService) {
        this.reviewService = reviewService;
        this.studioService = studioService;
        this.userService = userService;
        this.apptService = apptService;
        this.log = new common_1.Logger('StudioController');
    }
    getAllReviews(studioId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.log.log('[POST] getAllReviews for studio');
            const studio = yield this.studioService.getStudio(studioId);
            const reviews = yield this.reviewService.getReviewsByStudio(studio);
            this.log.debug(reviews);
            return reviews;
        });
    }
    getReviewsForStudioByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.log.log('[Get] getReviewsForStudioByUser');
            const user = yield this.userService.getUser(userId);
            const reviews = yield this.reviewService.getReviewsByUser(user);
            const rating = yield this.reviewService.calculateAverageRating(reviews);
            const response = { rating, reviews };
            this.log.debug('***** all user reviews *****');
            this.log.debug(response);
            this.log.debug('***** all user reviews *****\n');
            return response;
        });
    }
    getReviewsCount() {
        return __awaiter(this, void 0, void 0, function* () {
            this.log.log('[Get] getReviewsCount');
            const reviewCount = yield this.reviewService.getReviewsCount();
            const response = reviewCount;
            this.log.debug('***** all user reviews *****');
            this.log.debug(response);
            this.log.debug('***** all user reviews *****\n');
            return response;
        });
    }
    submitReview(reviewDto) {
        return __awaiter(this, void 0, void 0, function* () {
            this.log.log('[POST] submit review');
            const appt = yield this.apptService.getBooking(reviewDto.appointmentId);
            const reviewToSave = Object.assign(Object.assign({}, reviewDto), { appointment: appt });
            if (reviewDto.leftByUserType === review_entity_1.LEFT_BY_TYPES.ARTIST) {
                appt.artistLeftReview = true;
            }
            if (reviewDto.leftByUserType === review_entity_1.LEFT_BY_TYPES.STUDIO_MANAGER) {
                appt.hostLeftReview = true;
            }
            yield this.apptService.createOrUpdate(appt);
            const avgRaring = yield this.reviewService.addRating(reviewDto);
            reviewToSave.rating = avgRaring;
            return this.reviewService.createReview(reviewToSave);
        });
    }
    seedDB(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUser(body.userId);
            const studio = yield this.studioService.getStudio(body.studioId);
            yield this.reviewService.seedReviews(user, studio);
            return 'reviews added!';
        });
    }
};
__decorate([
    common_1.Get('/studios/:studioId'),
    __param(0, common_1.Param('studioId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getAllReviews", null);
__decorate([
    common_1.Get('/users/:userId'),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getReviewsForStudioByUser", null);
__decorate([
    common_1.Get('/count'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getReviewsCount", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "submitReview", null);
__decorate([
    common_1.Post('/seed'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "seedDB", null);
ReviewController = __decorate([
    common_1.Controller('reviews'),
    __metadata("design:paramtypes", [review_service_1.ReviewService,
        studio_service_1.StudioService,
        user_service_1.UserService,
        appointment_service_1.AppointmentService])
], ReviewController);
exports.ReviewController = ReviewController;
//# sourceMappingURL=review.controller.js.map