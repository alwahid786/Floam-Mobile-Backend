"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("../users/user.module");
const support_entity_1 = require("./support.entity");
const support_controller_1 = require("./support.controller");
const support_service_1 = require("./support.service");
const studio_module_1 = require("../studio/studio.module");
let SupportModule = class SupportModule {
};
SupportModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([support_entity_1.Support]),
            common_1.forwardRef(() => user_module_1.UserModule),
            common_1.forwardRef(() => studio_module_1.StudioModule)
        ],
        providers: [support_service_1.supportService],
        controllers: [support_controller_1.SupportController],
        exports: [support_service_1.supportService],
    })
], SupportModule);
exports.SupportModule = SupportModule;
//# sourceMappingURL=support.module.js.map