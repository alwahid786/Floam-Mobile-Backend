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
exports.ImageController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const image_entity_1 = require("../entities/image.entity");
const image_service_1 = require("./image.service");
let ImageController = class ImageController {
    constructor(imageService) {
        this.imageService = imageService;
        this.log = new common_1.Logger('ImageController');
    }
    getStudioImages(studioId) {
        this.log.log('[GET] studio images');
        return this.imageService.getStudioImages(studioId);
    }
    getUserProfileImage(userId, type) {
        this.log.log('[GET] user profile image');
        return this.imageService.getUserProfileImage(userId, type);
    }
    uploadFile(image, identifier, type) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.imageService.uploadImage(image, type, identifier);
        });
    }
    uploadFileWithoutId(image) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.imageService.uploadDocWithoutId(image);
        });
    }
    deleteStudioImages(imageIds) {
        return __awaiter(this, void 0, void 0, function* () {
            this.log.log(`[DELETE][removeImage]`);
            yield this.imageService.deleteImages(imageIds);
            return 'Image Deleted.';
        });
    }
};
__decorate([
    common_1.Get('/studios/:studioId'),
    __param(0, common_1.Param('studioId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "getStudioImages", null);
__decorate([
    common_1.Get('/users/:userId/profile'),
    __param(0, common_1.Param('userId')),
    __param(1, common_1.Query('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "getUserProfileImage", null);
__decorate([
    common_1.Post('upload/:identifier/:type'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('image')),
    __param(0, common_1.UploadedFile()),
    __param(1, common_1.Param('identifier')),
    __param(2, common_1.Param('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "uploadFile", null);
__decorate([
    common_1.Post('upload/doc'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('image')),
    __param(0, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "uploadFileWithoutId", null);
__decorate([
    common_1.Put('/delete'),
    __param(0, common_1.Body('imageIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "deleteStudioImages", null);
ImageController = __decorate([
    common_1.Controller('images'),
    __metadata("design:paramtypes", [image_service_1.ImageService])
], ImageController);
exports.ImageController = ImageController;
//# sourceMappingURL=image.controller.js.map