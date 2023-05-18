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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const seeder_1 = require("../utils/seeder");
const studio_entity_1 = require("../studio/studio.entity");
const review_entity_1 = require("./review.entity");
let ReviewService = class ReviewService {
    constructor(reviewRepo, studioRepo) {
        this.reviewRepo = reviewRepo;
        this.studioRepo = studioRepo;
        this.log = new common_1.Logger('ReviewService');
    }
    createReview(review) {
        return this.reviewRepo.save(review);
    }
    getReviewsByStudio(studio) {
        this.log.log('[getReviewsByStudio]');
        return this.reviewRepo.find({
            where: { studio },
            relations: ['leftByUser', 'studio'],
        });
    }
    getReviewsByUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const studios = yield this.studioRepo.find({
                where: { user },
            });
            const allReviewsForUser = [];
            for (const studio of studios) {
                const reviews = yield this.getReviewsByStudio(studio);
                allReviewsForUser.push(...reviews);
            }
            return allReviewsForUser;
        });
    }
    getReviewsCount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalCount = yield this.reviewRepo.count({});
                const recommendedCount = yield this.reviewRepo.count({
                    where: {
                        isRecommendations: true,
                    },
                });
                return {
                    totalCount,
                    recommendedCount,
                    notRecommendedCount: totalCount - recommendedCount,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    calculateAverageRating(reviews) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!reviews.length) {
                return 5;
            }
            const reviewIds = reviews.map((r) => r.id);
            const { avgRating } = yield this.reviewRepo
                .createQueryBuilder('review')
                .select('avg(review.rating)', 'avgRating')
                .whereInIds(reviewIds)
                .getRawOne();
            return parseFloat(avgRating.toFixed(1));
        });
    }
    seedReviews(user, studio) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < 10; i++) {
                const review = seeder_1.generateReview(studio, user);
                yield this.reviewRepo.save(review);
            }
        });
    }
    addRating(review) {
        return __awaiter(this, void 0, void 0, function* () {
            let rating = review.cleanlinessRating +
                review.timelinessRating +
                review.communicationRating;
            let avgRating = rating / 3;
            return avgRating;
        });
    }
};
ReviewService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(review_entity_1.Review)),
    __param(1, typeorm_1.InjectRepository(studio_entity_1.Studio)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ReviewService);
exports.ReviewService = ReviewService;
//# sourceMappingURL=review.service.js.map