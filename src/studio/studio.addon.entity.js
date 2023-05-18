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
exports.StudioAddOn = exports.ADD_ON_PRICE_OPTION = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../base/base.entity");
const studio_entity_1 = require("./studio.entity");
var ADD_ON_PRICE_OPTION;
(function (ADD_ON_PRICE_OPTION) {
    ADD_ON_PRICE_OPTION["INCLUDED"] = "INCLUDED";
    ADD_ON_PRICE_OPTION["PER_HOUR"] = "PER_HOUR";
    ADD_ON_PRICE_OPTION["FLAT_FEE"] = "FLAT_FEE";
})(ADD_ON_PRICE_OPTION = exports.ADD_ON_PRICE_OPTION || (exports.ADD_ON_PRICE_OPTION = {}));
let StudioAddOn = class StudioAddOn extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], StudioAddOn.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], StudioAddOn.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, default: null }),
    __metadata("design:type", Number)
], StudioAddOn.prototype, "price", void 0);
__decorate([
    typeorm_1.Column({ default: ADD_ON_PRICE_OPTION.INCLUDED }),
    __metadata("design:type", String)
], StudioAddOn.prototype, "priceOption", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], StudioAddOn.prototype, "studioId", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => studio_entity_1.Studio),
    typeorm_1.JoinColumn(),
    __metadata("design:type", studio_entity_1.Studio)
], StudioAddOn.prototype, "studio", void 0);
StudioAddOn = __decorate([
    typeorm_1.Entity({ name: 'studio_addons' })
], StudioAddOn);
exports.StudioAddOn = StudioAddOn;
//# sourceMappingURL=studio.addon.entity.js.map