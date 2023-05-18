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
exports.PaymentHistory = void 0;
const base_entity_1 = require("../base/base.entity");
const typeorm_1 = require("typeorm");
const appointment_entity_1 = require("../appointment/appointment.entity");
const user_entity_1 = require("../users/user.entity");
let PaymentHistory = class PaymentHistory extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PaymentHistory.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToMany((type) => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], PaymentHistory.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({ default: 0, type: 'float' }),
    __metadata("design:type", Number)
], PaymentHistory.prototype, "amount", void 0);
__decorate([
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], PaymentHistory.prototype, "status", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PaymentHistory.prototype, "text", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], PaymentHistory.prototype, "transactionId", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], PaymentHistory.prototype, "appointmentId", void 0);
__decorate([
    typeorm_1.ManyToMany((type) => appointment_entity_1.Appointment),
    typeorm_1.JoinColumn(),
    __metadata("design:type", appointment_entity_1.Appointment)
], PaymentHistory.prototype, "appointment", void 0);
PaymentHistory = __decorate([
    typeorm_1.Entity('paymentHistory')
], PaymentHistory);
exports.PaymentHistory = PaymentHistory;
//# sourceMappingURL=paymentHistory.entity.js.map