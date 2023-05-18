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
exports.StudioService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const index_1 = require("typeorm/index");
const flag_studio_entity_1 = require("../entities/flag.studio.entity");
const location_utils_1 = require("../location/location.utils");
const review_service_1 = require("../review/review.service");
const user_service_1 = require("../users/user.service");
const studio_entity_1 = require("./studio.entity");
const StudioNotFoundException_1 = require("./StudioNotFoundException");
var nodemailer = require('nodemailer');
let StudioService = class StudioService {
    constructor(studioRepository, flaggedStudioRepo, userService, reviewService) {
        this.studioRepository = studioRepository;
        this.flaggedStudioRepo = flaggedStudioRepo;
        this.userService = userService;
        this.reviewService = reviewService;
        this.log = new common_1.Logger('StudioService');
    }
    createOrUpdateStudio(studio) {
        return this.studioRepository.save(studio);
    }
    getStudiosByIds(studioIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const studios = yield this.studioRepository.find({
                where: { id: typeorm_2.In(studioIds) }
            });
            return yield this.transformToDtos(studios);
        });
    }
    getAllStudios() {
        return __awaiter(this, void 0, void 0, function* () {
            const studios = yield this.studioRepository.find();
            return this.transformToDtos(studios);
        });
    }
    getStudiosWithFilter(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            let idsToExclude = [];
            const { userId, minPrice, maxPrice, zipCode, maxDistance, guests, latitude, longitude, offSet, limit } = filter;
            let { statuses } = filter;
            if (typeof statuses === 'string') {
                statuses = JSON.parse(statuses);
            }
            let query = { status: typeorm_2.In(statuses) };
            if (minPrice && maxPrice) {
                query = Object.assign(Object.assign({}, query), { price: typeorm_2.Between(minPrice, maxPrice) });
            }
            if (maxPrice && maxPrice >= 200) {
                query = Object.assign(Object.assign({}, query), { price: index_1.MoreThanOrEqual(minPrice) });
            }
            if (guests) {
                query = Object.assign(Object.assign({}, query), { capacity: index_1.MoreThanOrEqual(guests) });
            }
            if (userId) {
                const user = yield this.userService.getUser(userId);
                const flaggedStudios = yield this.flaggedStudioRepo.find({
                    where: { user }
                });
                if (flaggedStudios) {
                    idsToExclude = flaggedStudios.map(s => s.studioId);
                }
            }
            console.time("yoyo");
            query = idsToExclude.length ? Object.assign(Object.assign({}, query), { id: typeorm_2.Not(typeorm_2.In(idsToExclude)) }) : query;
            let result = yield this.studioRepository.find({
                take: limit || 5,
                skip: offSet || 0,
                where: query
            });
            console.timeEnd("yoyo");
            if (!result) {
                result = [];
            }
            if (latitude && longitude) {
                const range = maxDistance || 100;
                const origin = { lat: latitude, lng: longitude };
                result = result.filter(studio => {
                    const { location: { lat, lng } } = studio;
                    const destination = { lat, lng };
                    return location_utils_1.isWithinRange(origin, destination, range);
                });
            }
            return this.transformToDtos(result);
        });
    }
    getStudio(studioId) {
        return __awaiter(this, void 0, void 0, function* () {
            const studio = yield this.studioRepository.findOne(studioId);
            if (!studio) {
                throw new StudioNotFoundException_1.StudioNotFoundException();
            }
            return studio;
        });
    }
    getStudioDto(studioId) {
        return __awaiter(this, void 0, void 0, function* () {
            const studio = yield this.getStudio(studioId);
            return this.transformToDto(studio);
        });
    }
    getStudiosByUser(user) {
        return this.studioRepository.find({
            where: { user }
        });
    }
    transformToDtos(studios) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = [];
            yield Promise.all(studios.map(studio => {
                return new Promise((resolve) => {
                    this.transformToDto(studio).then(studioDto => {
                        response.push(studioDto);
                        resolve(true);
                    });
                });
            }));
            return response;
        });
    }
    transformToDto(studio) {
        return __awaiter(this, void 0, void 0, function* () {
            const reviews = yield this.reviewService.getReviewsByStudio(studio);
            let rating = 5;
            if (reviews && reviews.length > 0) {
                rating = yield this.reviewService.calculateAverageRating(reviews);
            }
            return Object.assign(Object.assign({}, studio), { rating, reviewsCount: reviews.length || 0 });
        });
    }
    flagStudio(userId, studioId, text) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUser(userId);
            const studio = yield this.studioRepository.findOne(studioId);
            const flagStudio = {
                userId,
                user,
                studioId,
                studio,
            };
            yield this.flaggedStudioRepo.save(flagStudio);
            sendEmail('floamco1@gmail.com', user, studio, text);
            return 'studio has been successfully flagged.';
        });
    }
    hasActiveStudio(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const studios = yield this.studioRepository.find({ where: { userId: user.id, status: 'APPROVED' } });
            return studios.length > 0;
        });
    }
};
StudioService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(studio_entity_1.Studio)),
    __param(1, typeorm_1.InjectRepository(flag_studio_entity_1.FlagStudio)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        user_service_1.UserService,
        review_service_1.ReviewService])
], StudioService);
exports.StudioService = StudioService;
let sendEmail = (email, user, studio, text) => __awaiter(void 0, void 0, void 0, function* () {
    let msg = `${user.firstName} ${user.lastName} (${user.email}) has reported the studio ${studio.name} for the following reason :<br></br>
  description: ${text}`;
    ;
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
//# sourceMappingURL=studio.service.js.map