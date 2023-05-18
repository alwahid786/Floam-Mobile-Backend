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
exports.Studio = void 0;
const base_entity_1 = require("../base/base.entity");
const typeorm_1 = require("typeorm");
const location_entity_1 = require("../location/location.entity");
const user_entity_1 = require("../users/user.entity");
const amenity_entity_1 = require("./amenity.entity");
const studio_addon_entity_1 = require("./studio.addon.entity");
const studio_status_1 = require("./studio.status");
let Studio = class Studio extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ length: 200 }),
    __metadata("design:type", String)
], Studio.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ default: studio_status_1.STUDIO_STATUS.PENDING_APPROVAL }),
    __metadata("design:type", String)
], Studio.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Studio.prototype, "rejected_reason", void 0);
__decorate([
    typeorm_1.Column({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Studio.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ default: [], type: 'jsonb' }),
    __metadata("design:type", Array)
], Studio.prototype, "rules", void 0);
__decorate([
    typeorm_1.Column({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], Studio.prototype, "price", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Studio.prototype, "capacity", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Studio.prototype, "isLive", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Studio.prototype, "depositRequired", void 0);
__decorate([
    typeorm_1.Column({ length: 500, nullable: true, default: 'Kitchen' }),
    __metadata("design:type", String)
], Studio.prototype, "studioLocation", void 0);
__decorate([
    typeorm_1.OneToMany(type => studio_addon_entity_1.StudioAddOn, addOn => addOn.studio, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], Studio.prototype, "addOns", void 0);
__decorate([
    typeorm_1.OneToMany(type => amenity_entity_1.Amenity, am => am.studio, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], Studio.prototype, "amenities", void 0);
__decorate([
    typeorm_1.OneToOne(type => location_entity_1.Location, { nullable: true, cascade: true, eager: true }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", location_entity_1.Location)
], Studio.prototype, "location", void 0);
__decorate([
    typeorm_1.Column({ default: [], type: 'jsonb' }),
    __metadata("design:type", Array)
], Studio.prototype, "genres", void 0);
__decorate([
    typeorm_1.Column({ default: [], type: 'jsonb' }),
    __metadata("design:type", Array)
], Studio.prototype, "artistLevels", void 0);
__decorate([
    typeorm_1.Column({ type: 'timestamp', default: null }),
    __metadata("design:type", Object)
], Studio.prototype, "studioOpen", void 0);
__decorate([
    typeorm_1.Column({ type: 'timestamp', default: null }),
    __metadata("design:type", Object)
], Studio.prototype, "studioClose", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Studio.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User, { eager: true }),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Studio.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({ default: [], type: 'jsonb' }),
    __metadata("design:type", Array)
], Studio.prototype, "hardware", void 0);
__decorate([
    typeorm_1.Column({ default: [], type: 'jsonb' }),
    __metadata("design:type", Array)
], Studio.prototype, "software", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Studio.prototype, "minSessionLength", void 0);
Studio = __decorate([
    typeorm_1.Entity('studio')
], Studio);
exports.Studio = Studio;
//# sourceMappingURL=studio.entity.js.map