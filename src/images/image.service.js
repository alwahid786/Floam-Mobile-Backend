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
exports.ImageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const index_1 = require("typeorm/index");
const image_entity_1 = require("../entities/image.entity");
const studio_service_1 = require("../studio/studio.service");
const user_service_1 = require("../users/user.service");
const s3Client_1 = require("../utils/s3Client");
let ImageService = class ImageService {
    constructor(imageRepo, studioService, userService) {
        this.imageRepo = imageRepo;
        this.studioService = studioService;
        this.userService = userService;
        this.log = new common_1.Logger('ImageService');
        this.s3Client = new s3Client_1.default();
    }
    uploadImage(image, type, identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const [key, id] = identifier.split(':');
            this.log.log(`[uploadImage] identifier: ${identifier}`);
            if (!key || !id) {
                this.log.error(`Invalid identifier: ${identifier}`);
                throw new common_1.HttpException('Invalid identifier', common_1.HttpStatus.BAD_REQUEST);
            }
            let studio = null;
            let user = null;
            if (key === 'studio') {
                studio = yield this.studioService.getStudio(id);
            }
            if (key === 'user') {
                user = yield this.userService.getUser(id);
            }
            let imageSrc = null;
            if (type === image_entity_1.IMAGE_TYPE.GID) {
                imageSrc = yield this.s3Client.uploadGovernmentId(image, id);
            }
            else if (type === image_entity_1.IMAGE_TYPE.STUDIO) {
                imageSrc = yield this.s3Client.uploadStudioPicture(image, id);
            }
            else if (type === image_entity_1.IMAGE_TYPE.PROFILE) {
                imageSrc = yield this.s3Client.uploadProfilePicture(image, id);
            }
            else if (type === image_entity_1.IMAGE_TYPE.DOCLINK) {
                imageSrc = yield this.s3Client.uploadDocLink(image, id);
            }
            if (!imageSrc) {
                throw new common_1.HttpException('Invalid Image Type', common_1.HttpStatus.BAD_REQUEST);
            }
            const newImage = {
                src: imageSrc,
                type,
                studioId: (studio === null || studio === void 0 ? void 0 : studio.id) || null,
                userId: (user === null || user === void 0 ? void 0 : user.id) || null,
            };
            this.log.log(`[ImageController] .................. End`);
            return yield this.imageRepo.save(newImage);
        });
    }
    uploadDocWithoutId(image) {
        return __awaiter(this, void 0, void 0, function* () {
            let imageSrc = null;
            imageSrc = yield this.s3Client.uploadDocWithoutId(image);
            if (!imageSrc) {
                throw new common_1.HttpException('Invalid Image Type', common_1.HttpStatus.BAD_REQUEST);
            }
            return imageSrc;
        });
    }
    getStudioImages(studioId) {
        return __awaiter(this, void 0, void 0, function* () {
            const studio = yield this.studioService.getStudio(studioId);
            return this.imageRepo.find({
                where: { studio },
            });
        });
    }
    deleteImages(imageIds) {
        return __awaiter(this, void 0, void 0, function* () {
            if (imageIds && imageIds.length) {
                for (var id of imageIds) {
                    yield this.imageRepo.delete(id);
                }
            }
            return;
        });
    }
    getUserProfileImage(userId, type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (type) {
                const user = yield this.userService.getUser(userId);
                return this.imageRepo.findOne({
                    where: { user, type: type },
                });
            }
            else {
                const user = yield this.userService.getUser(userId);
                const images_list = yield this.imageRepo.find({
                    where: { user, type: image_entity_1.IMAGE_TYPE.PROFILE },
                });
                return images_list[images_list.length - 1];
            }
        });
    }
};
ImageService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(image_entity_1.Image)),
    __metadata("design:paramtypes", [index_1.Repository,
        studio_service_1.StudioService,
        user_service_1.UserService])
], ImageService);
exports.ImageService = ImageService;
//# sourceMappingURL=image.service.js.map