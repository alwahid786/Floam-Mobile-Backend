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
exports.Appointment = exports.APPT_STATUSES = void 0;
const base_entity_1 = require("../base/base.entity");
const typeorm_1 = require("typeorm");
const studio_addon_entity_1 = require("../studio/studio.addon.entity");
const studio_entity_1 = require("../studio/studio.entity");
const user_entity_1 = require("../users/user.entity");
var APPT_STATUSES;
(function (APPT_STATUSES) {
    APPT_STATUSES["PAID"] = "paid";
    APPT_STATUSES["PENDING"] = "pending";
    APPT_STATUSES["CONFIRMED"] = "confirmed";
    APPT_STATUSES["CANCELLED"] = "cancelled";
})(APPT_STATUSES = exports.APPT_STATUSES || (exports.APPT_STATUSES = {}));
let Appointment = class Appointment extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Appointment.prototype, "start", void 0);
__decorate([
    typeorm_1.Column({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Appointment.prototype, "end", void 0);
__decorate([
    typeorm_1.Column({ type: 'decimal', default: 0.00, nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "total", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Appointment.prototype, "studioId", void 0);
__decorate([
    typeorm_1.Column({ default: null, nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "paymentIntent", void 0);
__decorate([
    typeorm_1.ManyToOne(type => studio_entity_1.Studio),
    __metadata("design:type", studio_entity_1.Studio)
], Appointment.prototype, "studio", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Appointment.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Appointment.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Appointment.prototype, "hostLeftReview", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Appointment.prototype, "artistLeftReview", void 0);
__decorate([
    typeorm_1.Column({ default: null }),
    __metadata("design:type", Date)
], Appointment.prototype, "cancelledAt", void 0);
__decorate([
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], Appointment.prototype, "cancellationReason", void 0);
__decorate([
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], Appointment.prototype, "cancelledByUserId", void 0);
__decorate([
    typeorm_1.ManyToMany(type => studio_addon_entity_1.StudioAddOn),
    typeorm_1.JoinTable({
        name: 'appointment_add_ons',
        joinColumn: { name: 'appointment_id' },
        inverseJoinColumn: { name: 'add_on_id' },
    }),
    __metadata("design:type", Array)
], Appointment.prototype, "addOns", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "notes", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Appointment.prototype, "numOfGuests", void 0);
__decorate([
    typeorm_1.Column({ default: APPT_STATUSES.PENDING }),
    __metadata("design:type", String)
], Appointment.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Appointment.prototype, "notificationSent", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Appointment.prototype, "isEarning", void 0);
__decorate([
    typeorm_1.Column({ type: 'decimal', default: 0.00, nullable: true }),
    __metadata("design:type", Number)
], Appointment.prototype, "floamAmount", void 0);
Appointment = __decorate([
    typeorm_1.Entity('appointment')
], Appointment);
exports.Appointment = Appointment;
//# sourceMappingURL=appointment.entity.js.map