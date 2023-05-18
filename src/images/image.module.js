"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageModule = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const typeorm_1 = require("@nestjs/typeorm");
const image_entity_1 = require("../entities/image.entity");
const studio_module_1 = require("../studio/studio.module");
const user_module_1 = require("../users/user.module");
const image_controller_1 = require("./image.controller");
const image_service_1 = require("./image.service");
let ImageModule = class ImageModule {
};
ImageModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([image_entity_1.Image]),
            platform_express_1.MulterModule.register(),
            common_1.forwardRef(() => user_module_1.UserModule),
            common_1.forwardRef(() => studio_module_1.StudioModule),
        ],
        controllers: [image_controller_1.ImageController],
        providers: [image_service_1.ImageService],
        exports: [],
    })
], ImageModule);
exports.ImageModule = ImageModule;
//# sourceMappingURL=image.module.js.map