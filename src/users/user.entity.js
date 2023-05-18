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
exports.User = exports.USER_STATUS = void 0;
const base_entity_1 = require("../base/base.entity");
const typeorm_1 = require("typeorm");
const location_entity_1 = require("../location/location.entity");
var USER_STATUS;
(function (USER_STATUS) {
    USER_STATUS["ACTIVE"] = "ACTIVE";
    USER_STATUS["REGISTRATION"] = "REGISTRATION";
})(USER_STATUS = exports.USER_STATUS || (exports.USER_STATUS = {}));
let User = class User extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ default: null, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ length: 200, default: null, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column({ length: 200, default: null, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column({ length: 100, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ default: null, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "clientConnectId", void 0);
__decorate([
    typeorm_1.Column({ default: null, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "docLink", void 0);
__decorate([
    typeorm_1.Column({ default: null, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column({ default: null, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "dateOfBirth", void 0);
__decorate([
    typeorm_1.Column({ default: null, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    typeorm_1.Column({ default: null, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "ethnicity", void 0);
__decorate([
    typeorm_1.Column({ default: null, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "bio", void 0);
__decorate([
    typeorm_1.OneToOne((type) => location_entity_1.Location, {
        cascade: true,
        eager: true,
        nullable: true,
    }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", location_entity_1.Location)
], User.prototype, "location", void 0);
__decorate([
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], User.prototype, "pushToken", void 0);
__decorate([
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], User.prototype, "artistName", void 0);
__decorate([
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ default: null, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "facebookId", void 0);
__decorate([
    typeorm_1.Column({ default: null, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "googleId", void 0);
__decorate([
    typeorm_1.Column({ default: null, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "appleId", void 0);
__decorate([
    typeorm_1.Column({ default: null, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "customerId", void 0);
__decorate([
    typeorm_1.Column({ default: 'email', nullable: false }),
    __metadata("design:type", String)
], User.prototype, "loginType", void 0);
User = __decorate([
    typeorm_1.Entity('user')
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map