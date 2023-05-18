import {MigrationInterface, QueryRunner} from "typeorm";

export class removeStateAndCity1646216909509 implements MigrationInterface {
    name = 'removeStateAndCity1646216909509'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bankDetail" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "bankDetail" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "lat" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "lng" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "first_name" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "last_name" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "doc_link" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "phone" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "date_of_birth" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "gender" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "ethnicity" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "bio" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "push_token" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "artist_name" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "status" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "facebook_id" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "google_id" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "apple_id" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "customer_id" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "studio" ALTER COLUMN "studio_open" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "studio" ALTER COLUMN "studio_close" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "studio_addons" ALTER COLUMN "price" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "cancelled_at" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "cancellation_reason" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "cancelled_by_user_id" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "bankDetail" ALTER COLUMN "bank_token" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "bankDetail" ALTER COLUMN "bank_account_token" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "paymentHistory" ALTER COLUMN "status" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "payout" ALTER COLUMN "stripe_user_payout_id" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "review" ALTER COLUMN "private_comment" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "unserviceableLocation" ALTER COLUMN "lat" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "unserviceableLocation" ALTER COLUMN "lng" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "UserNotification" ALTER COLUMN "entity_id" SET DEFAULT null`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserNotification" ALTER COLUMN "entity_id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "unserviceableLocation" ALTER COLUMN "lng" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "unserviceableLocation" ALTER COLUMN "lat" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "review" ALTER COLUMN "private_comment" SET DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE "payout" ALTER COLUMN "stripe_user_payout_id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "paymentHistory" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "bankDetail" ALTER COLUMN "bank_account_token" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "bankDetail" ALTER COLUMN "bank_token" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "cancelled_by_user_id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "cancellation_reason" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "cancelled_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "studio_addons" ALTER COLUMN "price" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "studio" ALTER COLUMN "studio_close" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "studio" ALTER COLUMN "studio_open" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "customer_id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "apple_id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "google_id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "facebook_id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "artist_name" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "push_token" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "bio" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "ethnicity" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "gender" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "date_of_birth" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "phone" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "doc_link" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "last_name" SET DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "first_name" SET DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "lng" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "lat" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "bankDetail" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bankDetail" ADD "state" character varying NOT NULL`);
    }

}
