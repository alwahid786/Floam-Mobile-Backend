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
exports.UserNotification = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
const base_entity_1 = require("../base/base.entity");
let UserNotification = class UserNotification extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserNotification.prototype, "text", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserNotification.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, default: null }),
    __metadata("design:type", String)
], UserNotification.prototype, "entityId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserNotification.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_entity_1.User, { eager: true }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", user_entity_1.User)
], UserNotification.prototype, "user", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], UserNotification.prototype, "wasRead", void 0);
UserNotification = __decorate([
    typeorm_1.Entity('UserNotification')
], UserNotification);
exports.UserNotification = UserNotification;
//# sourceMappingURL=userNotification.entity.js.map