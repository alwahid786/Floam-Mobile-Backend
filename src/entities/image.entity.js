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
exports.Image = exports.IMAGE_TYPE = void 0;
const base_entity_1 = require("../base/base.entity");
const typeorm_1 = require("typeorm");
const studio_entity_1 = require("../studio/studio.entity");
const user_entity_1 = require("../users/user.entity");
var IMAGE_TYPE;
(function (IMAGE_TYPE) {
    IMAGE_TYPE["PROFILE"] = "profile_pic";
    IMAGE_TYPE["STUDIO"] = "studio_pic";
    IMAGE_TYPE["GID"] = "government_id";
    IMAGE_TYPE["DOCLINK"] = "doc_link";
})(IMAGE_TYPE = exports.IMAGE_TYPE || (exports.IMAGE_TYPE = {}));
let Image = class Image extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Image.prototype, "src", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Image.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Image.prototype, "studioId", void 0);
__decorate([
    typeorm_1.ManyToOne((type1) => studio_entity_1.Studio, { nullable: true }),
    typeorm_1.JoinColumn({ name: 'studio_id' }),
    __metadata("design:type", studio_entity_1.Studio)
], Image.prototype, "studio", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Image.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne((type1) => user_entity_1.User, { nullable: true }),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Image.prototype, "user", void 0);
Image = __decorate([
    typeorm_1.Entity('image')
], Image);
exports.Image = Image;
//# sourceMappingURL=image.entity.js.map