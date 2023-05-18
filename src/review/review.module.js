"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const appointment_module_1 = require("../appointment/appointment.module");
const studio_module_1 = require("../studio/studio.module");
const user_module_1 = require("../users/user.module");
const review_entity_1 = require("./review.entity");
const review_controller_1 = require("./review.controller");
const review_service_1 = require("./review.service");
let ReviewModule = class ReviewModule {
};
ReviewModule = __decorate([
    common_1.Module({
        imports: [
            common_1.forwardRef(() => user_module_1.UserModule),
            common_1.forwardRef(() => studio_module_1.StudioModule),
            common_1.forwardRef(() => appointment_module_1.AppointmentModule),
            typeorm_1.TypeOrmModule.forFeature([review_entity_1.Review]),
        ],
        controllers: [review_controller_1.ReviewController],
        providers: [review_service_1.ReviewService],
        exports: [typeorm_1.TypeOrmModule, review_service_1.ReviewService],
    })
], ReviewModule);
exports.ReviewModule = ReviewModule;
//# sourceMappingURL=review.module.js.map