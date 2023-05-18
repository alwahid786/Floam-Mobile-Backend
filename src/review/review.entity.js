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
exports.Review = exports.LEFT_BY_TYPES = void 0;
const typeorm_1 = require("typeorm");
const appointment_entity_1 = require("../appointment/appointment.entity");
const base_entity_1 = require("../base/base.entity");
const studio_entity_1 = require("../studio/studio.entity");
const user_entity_1 = require("../users/user.entity");
var LEFT_BY_TYPES;
(function (LEFT_BY_TYPES) {
    LEFT_BY_TYPES["ARTIST"] = "artist";
    LEFT_BY_TYPES["STUDIO_MANAGER"] = "studio_manager";
})(LEFT_BY_TYPES = exports.LEFT_BY_TYPES || (exports.LEFT_BY_TYPES = {}));
let Review = class Review extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column('float'),
    __metadata("design:type", Number)
], Review.prototype, "rating", void 0);
__decorate([
    typeorm_1.Column('float'),
    __metadata("design:type", Number)
], Review.prototype, "cleanlinessRating", void 0);
__decorate([
    typeorm_1.Column('float'),
    __metadata("design:type", Number)
], Review.prototype, "timelinessRating", void 0);
__decorate([
    typeorm_1.Column('float'),
    __metadata("design:type", Number)
], Review.prototype, "communicationRating", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Review.prototype, "isExpectations", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Review.prototype, "isRecommendations", void 0);
__decorate([
    typeorm_1.Column({ length: 600 }),
    __metadata("design:type", String)
], Review.prototype, "comment", void 0);
__decorate([
    typeorm_1.Column({ length: 600, nullable: true, default: null }),
    __metadata("design:type", String)
], Review.prototype, "privateComment", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Review.prototype, "studioId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => studio_entity_1.Studio),
    typeorm_1.JoinColumn(),
    __metadata("design:type", studio_entity_1.Studio)
], Review.prototype, "studio", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Review.prototype, "appointmentId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => appointment_entity_1.Appointment),
    typeorm_1.JoinColumn(),
    __metadata("design:type", appointment_entity_1.Appointment)
], Review.prototype, "appointment", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Review.prototype, "leftByUserType", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Review.prototype, "leftByUserId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User),
    typeorm_1.JoinColumn({ name: 'left_by_user_id' }),
    __metadata("design:type", user_entity_1.User)
], Review.prototype, "leftByUser", void 0);
Review = __decorate([
    typeorm_1.Entity('review')
], Review);
exports.Review = Review;
//# sourceMappingURL=review.entity.js.map