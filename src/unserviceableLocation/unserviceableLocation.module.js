"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnserviceableLocationModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const unserviceableLocation_controller_1 = require("./unserviceableLocation.controller");
const unserviceableLocation_entity_1 = require("./unserviceableLocation.entity");
const unserviceableLocation_service_1 = require("./unserviceableLocation.service");
let UnserviceableLocationModule = class UnserviceableLocationModule {
};
UnserviceableLocationModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([unserviceableLocation_entity_1.UnserviceableLocation])],
        controllers: [unserviceableLocation_controller_1.UnserviceableLocationController],
        providers: [unserviceableLocation_service_1.UnserviceableLocationService],
        exports: [unserviceableLocation_service_1.UnserviceableLocationService],
    })
], UnserviceableLocationModule);
exports.UnserviceableLocationModule = UnserviceableLocationModule;
//# sourceMappingURL=unserviceableLocation.module.js.map