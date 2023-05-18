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
exports.UnserviceableLocationController = void 0;
const common_1 = require("@nestjs/common");
const unserviceableLocation_entity_1 = require("./unserviceableLocation.entity");
const unserviceableLocation_service_1 = require("./unserviceableLocation.service");
let UnserviceableLocationController = class UnserviceableLocationController {
    constructor(unserviceableLocationService) {
        this.unserviceableLocationService = unserviceableLocationService;
    }
    create(unserviceableLocation) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!unserviceableLocation.city) {
                throw new Error('city is required');
            }
            if (!unserviceableLocation.state) {
                throw new Error('state is required');
            }
            if (!unserviceableLocation.zipCode) {
                throw new Error('zipCode is required');
            }
            const createdModel = yield this.unserviceableLocationService.create(unserviceableLocation);
            return createdModel;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const foundModels = yield this.unserviceableLocationService.getAll();
            return foundModels;
        });
    }
};
__decorate([
    common_1.Post('create'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [unserviceableLocation_entity_1.UnserviceableLocation]),
    __metadata("design:returntype", Promise)
], UnserviceableLocationController.prototype, "create", null);
__decorate([
    common_1.Get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UnserviceableLocationController.prototype, "getAll", null);
UnserviceableLocationController = __decorate([
    common_1.Controller('unserviceableLocation'),
    __metadata("design:paramtypes", [unserviceableLocation_service_1.UnserviceableLocationService])
], UnserviceableLocationController);
exports.UnserviceableLocationController = UnserviceableLocationController;
//# sourceMappingURL=unserviceableLocation.controller.js.map