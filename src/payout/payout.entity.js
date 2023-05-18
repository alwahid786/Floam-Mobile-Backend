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
exports.Payout = exports.PAYOUT_STATUSES = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
const base_entity_1 = require("../base/base.entity");
const appointment_entity_1 = require("../appointment/appointment.entity");
var PAYOUT_STATUSES;
(function (PAYOUT_STATUSES) {
    PAYOUT_STATUSES["REQUESTED"] = "requested";
    PAYOUT_STATUSES["APPROVED"] = "approved";
    PAYOUT_STATUSES["REJECTED"] = "rejected";
})(PAYOUT_STATUSES = exports.PAYOUT_STATUSES || (exports.PAYOUT_STATUSES = {}));
let Payout = class Payout extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ default: 0, type: 'float' }),
    __metadata("design:type", Number)
], Payout.prototype, "totalAmount", void 0);
__decorate([
    typeorm_1.Column({ default: 0, type: 'float' }),
    __metadata("design:type", Number)
], Payout.prototype, "floamAmount", void 0);
__decorate([
    typeorm_1.Column({ default: 0, type: 'float' }),
    __metadata("design:type", Number)
], Payout.prototype, "studioUserAmount", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Payout.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Payout.prototype, "responseData", void 0);
__decorate([
    typeorm_1.Column({ default: PAYOUT_STATUSES.REQUESTED }),
    __metadata("design:type", String)
], Payout.prototype, "status", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_entity_1.User, { eager: true }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", user_entity_1.User)
], Payout.prototype, "user", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Payout.prototype, "appointmentId", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => appointment_entity_1.Appointment, { eager: true }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", appointment_entity_1.Appointment)
], Payout.prototype, "appointment", void 0);
__decorate([
    typeorm_1.Column({ default: null, nullable: true }),
    __metadata("design:type", String)
], Payout.prototype, "stripeUserPayoutId", void 0);
Payout = __decorate([
    typeorm_1.Entity('payout')
], Payout);
exports.Payout = Payout;
//# sourceMappingURL=payout.entity.js.map