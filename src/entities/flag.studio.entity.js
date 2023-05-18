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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlagStudio = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../base/base.entity");
const studio_entity_1 = require("../studio/studio.entity");
const user_entity_1 = require("../users/user.entity");
let FlagStudio = class FlagStudio extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], FlagStudio.prototype, "studioId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => studio_entity_1.Studio),
    typeorm_1.JoinColumn(),
    __metadata("design:type", studio_entity_1.Studio)
], FlagStudio.prototype, "studio", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], FlagStudio.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User),
    typeorm_1.JoinColumn(),
    __metadata("design:type", user_entity_1.User)
], FlagStudio.prototype, "user", void 0);
FlagStudio = __decorate([
    typeorm_1.Entity('flagged_studios')
], FlagStudio);
exports.FlagStudio = FlagStudio;
//# sourceMappingURL=flag.studio.entity.js.map