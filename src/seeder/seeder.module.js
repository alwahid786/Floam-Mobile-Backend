"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeederModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const payment_module_1 = require("../payment/payment.module");
const appointment_module_1 = require("../appointment/appointment.module");
const image_entity_1 = require("../entities/image.entity");
const review_module_1 = require("../review/review.module");
const studio_entity_1 = require("../studio/studio.entity");
const studio_module_1 = require("../studio/studio.module");
const user_entity_1 = require("../users/user.entity");
const user_module_1 = require("../users/user.module");
const seeder_controller_1 = require("./seeder.controller");
let SeederModule = class SeederModule {
};
SeederModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                image_entity_1.Image,
                studio_entity_1.Studio,
                user_entity_1.User,
            ]),
            user_module_1.UserModule,
            studio_module_1.StudioModule,
            review_module_1.ReviewModule,
            appointment_module_1.AppointmentModule,
            payment_module_1.PaymentModule,
        ],
        controllers: [seeder_controller_1.SeederController],
        exports: []
    })
], SeederModule);
exports.SeederModule = SeederModule;
//# sourceMappingURL=seeder.module.js.map