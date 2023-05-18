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
exports.NotificationPreference = exports.NotificationPreferenceTypes = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../base/base.entity");
const user_entity_1 = require("../users/user.entity");
var NotificationPreferenceTypes;
(function (NotificationPreferenceTypes) {
    NotificationPreferenceTypes["REMINDERS"] = "REMINDERS";
    NotificationPreferenceTypes["MESSAGES"] = "MESSAGES";
    NotificationPreferenceTypes["PROMOTIONS"] = "PROMOTIONS";
    NotificationPreferenceTypes["SUPPORT"] = "SUPPORT";
})(NotificationPreferenceTypes = exports.NotificationPreferenceTypes || (exports.NotificationPreferenceTypes = {}));
let NotificationPreference = class NotificationPreference extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], NotificationPreference.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], NotificationPreference.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], NotificationPreference.prototype, "sms", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], NotificationPreference.prototype, "push", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], NotificationPreference.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], NotificationPreference.prototype, "user", void 0);
NotificationPreference = __decorate([
    typeorm_1.Entity('notification_preferences')
], NotificationPreference);
exports.NotificationPreference = NotificationPreference;
//# sourceMappingURL=notification.preference.entity.js.map