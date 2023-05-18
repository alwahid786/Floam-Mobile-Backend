"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeStateAndCity1646216909509 = void 0;
class removeStateAndCity1646216909509 {
    constructor() {
        this.name = 'removeStateAndCity1646216909509';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "bankDetail" DROP COLUMN "state"`);
            yield queryRunner.query(`ALTER TABLE "bankDetail" DROP COLUMN "city"`);
            yield queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "lat" SET DEFAULT null`);
            yield queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "lng" SET DEFAULT null`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET DEFAULT null`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "first_name" SET DEFAULT null`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "last_name" SET DEFAULT null`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "doc_link" SET DEFAULT null`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "phone" SET DEFAULT null`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "date_of_birth" SET DEFAULT null`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "gender" SET DEFAULT null`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "ethnicity" SET DEFAULT null`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "bio" SET DEFAULT null`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "push_token" SET DEFAULT null`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "artist_name" SET DEFAULT null`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "status" SET DEFAULT null`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "facebook_id" SET DEFAULT null`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "google_id" SET DEFAULT null`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "apple_id" SET DEFAULT null`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "customer_id" SET DEFAULT null`);
            yield queryRunner.query(`ALTER TABLE "studio" ALTER COLUMN "studio_open" SET DEFAULT null`);
            yield queryRunner.query(`ALTER TABLE "studio" ALTER COLUMN "studio_close" SET DEFAULT null`);
            yield queryRunner.query(`ALTER TABLE "studio_addons" ALTER COLUMN "price" SET DEFAULT null`);
            yield queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "cancelled_at" SET DEFAULT null`);
            yield queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "cancellation_reason" SET DEFAULT null`);
            yield queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "cancelled_by_user_id" SET DEFAULT null`);
            yield queryRunner.query(`ALTER TABLE "bankDetail" ALTER COLUMN "bank_token" SET DEFAULT null`);
            yield queryRunner.query(`ALTER TABLE "bankDetail" ALTER COLUMN "bank_account_token" SET DEFAULT null`);
            yield queryRunner.query(`ALTER TABLE "paymentHistory" ALTER COLUMN "status" SET DEFAULT null`);
            yield queryRunner.query(`ALTER TABLE "payout" ALTER COLUMN "stripe_user_payout_id" SET DEFAULT null`);
            yield queryRunner.query(`ALTER TABLE "review" ALTER COLUMN "private_comment" SET DEFAULT null`);
            yield queryRunner.query(`ALTER TABLE "unserviceableLocation" ALTER COLUMN "lat" SET DEFAULT null`);
            yield queryRunner.query(`ALTER TABLE "unserviceableLocation" ALTER COLUMN "lng" SET DEFAULT null`);
            yield queryRunner.query(`ALTER TABLE "UserNotification" ALTER COLUMN "entity_id" SET DEFAULT null`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "UserNotification" ALTER COLUMN "entity_id" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "unserviceableLocation" ALTER COLUMN "lng" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "unserviceableLocation" ALTER COLUMN "lat" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "review" ALTER COLUMN "private_comment" SET DEFAULT NULL`);
            yield queryRunner.query(`ALTER TABLE "payout" ALTER COLUMN "stripe_user_payout_id" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "paymentHistory" ALTER COLUMN "status" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "bankDetail" ALTER COLUMN "bank_account_token" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "bankDetail" ALTER COLUMN "bank_token" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "cancelled_by_user_id" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "cancellation_reason" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "cancelled_at" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "studio_addons" ALTER COLUMN "price" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "studio" ALTER COLUMN "studio_close" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "studio" ALTER COLUMN "studio_open" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "customer_id" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "apple_id" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "google_id" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "facebook_id" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "status" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "artist_name" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "push_token" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "bio" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "ethnicity" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "gender" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "date_of_birth" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "phone" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "doc_link" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "last_name" SET DEFAULT NULL`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "first_name" SET DEFAULT NULL`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "lng" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "lat" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "bankDetail" ADD "city" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "bankDetail" ADD "state" character varying NOT NULL`);
        });
    }
}
exports.removeStateAndCity1646216909509 = removeStateAndCity1646216909509;
//# sourceMappingURL=1646216909509-remove state and city.js.map