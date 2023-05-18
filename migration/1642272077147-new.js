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
exports.new1642272077147 = void 0;
class new1642272077147 {
    constructor() {
        this.name = 'new1642272077147';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "location" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "address_one" character varying NOT NULL, "address_two" character varying, "state" character varying NOT NULL, "city" character varying NOT NULL, "zip_code" character varying NOT NULL, "lat" double precision DEFAULT null, "lng" double precision DEFAULT null, CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "password" character varying DEFAULT null, "first_name" character varying(200) DEFAULT null, "last_name" character varying(200) DEFAULT null, "email" character varying(100), "doc_link" character varying DEFAULT null, "phone" character varying DEFAULT null, "date_of_birth" character varying DEFAULT null, "gender" character varying DEFAULT null, "ethnicity" character varying DEFAULT null, "bio" character varying DEFAULT null, "push_token" character varying DEFAULT null, "artist_name" character varying DEFAULT null, "status" character varying DEFAULT null, "facebook_id" character varying DEFAULT null, "google_id" character varying DEFAULT null, "apple_id" character varying DEFAULT null, "customer_id" character varying DEFAULT null, "login_type" character varying NOT NULL DEFAULT 'email', "location_id" uuid, CONSTRAINT "REL_37bfb01591406f0fefaed6799a" UNIQUE ("location_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "amenity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL, "description" character varying NOT NULL, "icon_name" character varying, "studio_id" uuid, CONSTRAINT "PK_f981de7b1a822823e5f31da10dc" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "studio" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(200) NOT NULL, "status" character varying NOT NULL DEFAULT 'APPROVED', "description" character varying(500), "rules" jsonb NOT NULL DEFAULT '[]', "price" double precision NOT NULL DEFAULT 0, "capacity" integer NOT NULL DEFAULT 0, "is_live" boolean NOT NULL DEFAULT false, "deposit_required" boolean NOT NULL DEFAULT false, "studio_location" character varying(500) DEFAULT 'Kitchen', "genres" jsonb NOT NULL DEFAULT '[]', "artist_levels" jsonb NOT NULL DEFAULT '[]', "studio_open" TIMESTAMP DEFAULT null, "studio_close" TIMESTAMP DEFAULT null, "user_id" uuid NOT NULL, "hardware" jsonb NOT NULL DEFAULT '[]', "software" jsonb NOT NULL DEFAULT '[]', "min_session_length" integer NOT NULL DEFAULT 0, "location_id" uuid, CONSTRAINT "REL_067eefeee721b7cbf5b5349947" UNIQUE ("location_id"), CONSTRAINT "PK_4c17ecb2b175322407ebbaef5c7" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "studio_addons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "price" integer DEFAULT null, "price_option" character varying NOT NULL DEFAULT 'INCLUDED', "studio_id" uuid, CONSTRAINT "PK_dbbcdb2b11d94726d1612e94f5e" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "appointment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "start" TIMESTAMP NOT NULL, "end" TIMESTAMP NOT NULL, "total" numeric DEFAULT 0, "studio_id" uuid NOT NULL, "user_id" uuid NOT NULL, "host_left_review" boolean NOT NULL DEFAULT false, "artist_left_review" boolean NOT NULL DEFAULT false, "cancelled_at" TIMESTAMP DEFAULT null, "cancellation_reason" character varying DEFAULT null, "cancelled_by_user_id" character varying DEFAULT null, "notes" character varying, "num_of_guests" integer NOT NULL DEFAULT 0, "status" character varying NOT NULL DEFAULT 'pending', "notification_sent" boolean NOT NULL DEFAULT false, "is_earning" boolean NOT NULL DEFAULT false, "floam_amount" numeric DEFAULT 0, CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "bankDetail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "bank_name" character varying NOT NULL, "routing_number" character varying NOT NULL, "account_number" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "bank_token" character varying DEFAULT null, "bank_account_token" character varying DEFAULT null, "user_id" uuid NOT NULL, CONSTRAINT "PK_08ea09c4918413424f43eea8ad9" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "calendar" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "studio_id" uuid NOT NULL, "auto_confirm_appts" boolean NOT NULL DEFAULT true, "events" jsonb NOT NULL DEFAULT '[]', CONSTRAINT "PK_2492fb846a48ea16d53864e3267" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "notification_preferences" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "type" character varying NOT NULL, "email" boolean NOT NULL DEFAULT true, "sms" boolean NOT NULL DEFAULT true, "push" boolean NOT NULL DEFAULT true, "user_id" uuid NOT NULL, CONSTRAINT "PK_e94e2b543f2f218ee68e4f4fad2" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "flagged_studios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "studio_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_5275377566f419a849dd562fa48" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "src" text NOT NULL, "type" character varying, "studio_id" uuid, "user_id" uuid, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "schedule" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "date" character varying NOT NULL, "start_time" character varying NOT NULL, "end_time" character varying NOT NULL, "timezone" character varying NOT NULL, "studio_id" uuid, CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "favorite" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, "studio_id" uuid, CONSTRAINT "PK_495675cec4fb09666704e4f610f" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "sender_id" uuid NOT NULL, "receiver_id" uuid NOT NULL, "content" character varying NOT NULL, "was_read" boolean NOT NULL, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "payment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" character varying NOT NULL, "stripe_customer_id" character varying NOT NULL, "cards" jsonb NOT NULL, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "paymentHistory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" character varying NOT NULL, "amount" double precision NOT NULL DEFAULT 0, "status" character varying DEFAULT null, "text" character varying NOT NULL, "transaction_id" character varying, "appointment_id" character varying, CONSTRAINT "PK_7275b553c86a64939a699be5ce3" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "payout" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "total_amount" double precision NOT NULL DEFAULT 0, "floam_amount" double precision NOT NULL DEFAULT 0, "studio_user_amount" double precision NOT NULL DEFAULT 0, "user_id" uuid NOT NULL, "response_data" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'requested', "appointment_id" uuid NOT NULL, "stripe_user_payout_id" character varying DEFAULT null, CONSTRAINT "PK_1cb73ce021dc6618a3818b0a474" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "rating" double precision NOT NULL, "cleanliness_rating" double precision NOT NULL, "timeliness_rating" double precision NOT NULL, "communication_rating" double precision NOT NULL, "is_expectations" boolean NOT NULL DEFAULT false, "is_recommendations" boolean NOT NULL DEFAULT false, "comment" character varying(600) NOT NULL, "private_comment" character varying(600) DEFAULT null, "studio_id" uuid NOT NULL, "appointment_id" uuid NOT NULL, "left_by_user_type" character varying NOT NULL, "left_by_user_id" uuid NOT NULL, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "support" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "text" character varying NOT NULL, "type" character varying NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_54c6021e6f6912eaaee36b3045d" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "unserviceableLocation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "state" character varying, "city" character varying, "zip_code" character varying, "lat" double precision DEFAULT null, "lng" double precision DEFAULT null, CONSTRAINT "PK_88d2b215edbb4fd4f1bdf480fa7" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "userBankDetail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "account_number" character varying NOT NULL, "routing_number" character varying NOT NULL, "bank_name" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "user_id" character varying NOT NULL, CONSTRAINT "PK_95f4eac0a3a2273a8a5c71d4e53" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "userCard" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "card_number" character varying NOT NULL, "exp_month" character varying NOT NULL, "exp_year" character varying NOT NULL, "card_token" character varying NOT NULL, "brand" character varying NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_c9d33b851dd34302d606437f86d" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "UserNotification" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "text" character varying NOT NULL, "type" character varying NOT NULL, "entity_id" character varying DEFAULT null, "user_id" uuid NOT NULL, "was_read" boolean NOT NULL, CONSTRAINT "PK_1da23e3efa6a9b9366563918a40" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "appointment_add_ons" ("appointment_id" uuid NOT NULL, "add_on_id" uuid NOT NULL, CONSTRAINT "PK_b55a36dd63f9a1af1d3a10ccb1f" PRIMARY KEY ("appointment_id", "add_on_id"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_695aaf6874aa9c5275be39e713" ON "appointment_add_ons" ("appointment_id") `);
            yield queryRunner.query(`CREATE INDEX "IDX_8258082117a5c90568752b7305" ON "appointment_add_ons" ("add_on_id") `);
            yield queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_37bfb01591406f0fefaed6799a0" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "amenity" ADD CONSTRAINT "FK_07ae0b979fe1c2ec274de1e93a1" FOREIGN KEY ("studio_id") REFERENCES "studio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "studio" ADD CONSTRAINT "FK_067eefeee721b7cbf5b5349947e" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "studio" ADD CONSTRAINT "FK_a6b01c9eacf0888b25d8a72dbbd" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "studio_addons" ADD CONSTRAINT "FK_c2fa2f46da135c3d86e54d4973d" FOREIGN KEY ("studio_id") REFERENCES "studio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_3c889a66a116ea3c6f0e10c461f" FOREIGN KEY ("studio_id") REFERENCES "studio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_15d50a87502380623ff0c27e458" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "bankDetail" ADD CONSTRAINT "FK_894bd19eff343c489216eb28925" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "calendar" ADD CONSTRAINT "FK_7fd5e60abfdc4ec51b19a3c522a" FOREIGN KEY ("studio_id") REFERENCES "studio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "notification_preferences" ADD CONSTRAINT "FK_64c90edc7310c6be7c10c96f675" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "flagged_studios" ADD CONSTRAINT "FK_4e2afd30450b1790f958bc68ce0" FOREIGN KEY ("studio_id") REFERENCES "studio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "flagged_studios" ADD CONSTRAINT "FK_e295a0057783a37ea9a39cb35c6" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_e53107478402327ffb3aeaea002" FOREIGN KEY ("studio_id") REFERENCES "studio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_b0b068a2be3e9a2ed6052786781" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_2c817184f9e1d8426a9faadadcc" FOREIGN KEY ("studio_id") REFERENCES "studio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_e666fc7cc4c80fba1944daa1a74" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_adb1721705e98b86fce23b2f090" FOREIGN KEY ("studio_id") REFERENCES "studio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_c0ab99d9dfc61172871277b52f6" FOREIGN KEY ("sender_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_f4da40532b0102d51beb220f16a" FOREIGN KEY ("receiver_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "payout" ADD CONSTRAINT "FK_f8f5bccecfe99a56eea8470a520" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "payout" ADD CONSTRAINT "FK_7a62de4dd9cc3597b4da30b7221" FOREIGN KEY ("appointment_id") REFERENCES "appointment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_903e62f543f7d13c3ee258dbc56" FOREIGN KEY ("studio_id") REFERENCES "studio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_0d93cb313f7d6575ce870300ac1" FOREIGN KEY ("appointment_id") REFERENCES "appointment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_f02390c6db48a87e4b5bc3363f0" FOREIGN KEY ("left_by_user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "support" ADD CONSTRAINT "FK_d53ceb941621665a8d6b1d1b186" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "userCard" ADD CONSTRAINT "FK_ccc4081576e550a9a5701bad932" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "UserNotification" ADD CONSTRAINT "FK_210956184473932df04bebb44c3" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "appointment_add_ons" ADD CONSTRAINT "FK_695aaf6874aa9c5275be39e7135" FOREIGN KEY ("appointment_id") REFERENCES "appointment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "appointment_add_ons" ADD CONSTRAINT "FK_8258082117a5c90568752b73051" FOREIGN KEY ("add_on_id") REFERENCES "studio_addons"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "appointment_add_ons" DROP CONSTRAINT "FK_8258082117a5c90568752b73051"`);
            yield queryRunner.query(`ALTER TABLE "appointment_add_ons" DROP CONSTRAINT "FK_695aaf6874aa9c5275be39e7135"`);
            yield queryRunner.query(`ALTER TABLE "UserNotification" DROP CONSTRAINT "FK_210956184473932df04bebb44c3"`);
            yield queryRunner.query(`ALTER TABLE "userCard" DROP CONSTRAINT "FK_ccc4081576e550a9a5701bad932"`);
            yield queryRunner.query(`ALTER TABLE "support" DROP CONSTRAINT "FK_d53ceb941621665a8d6b1d1b186"`);
            yield queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_f02390c6db48a87e4b5bc3363f0"`);
            yield queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_0d93cb313f7d6575ce870300ac1"`);
            yield queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_903e62f543f7d13c3ee258dbc56"`);
            yield queryRunner.query(`ALTER TABLE "payout" DROP CONSTRAINT "FK_7a62de4dd9cc3597b4da30b7221"`);
            yield queryRunner.query(`ALTER TABLE "payout" DROP CONSTRAINT "FK_f8f5bccecfe99a56eea8470a520"`);
            yield queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_f4da40532b0102d51beb220f16a"`);
            yield queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_c0ab99d9dfc61172871277b52f6"`);
            yield queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_adb1721705e98b86fce23b2f090"`);
            yield queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_e666fc7cc4c80fba1944daa1a74"`);
            yield queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_2c817184f9e1d8426a9faadadcc"`);
            yield queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_b0b068a2be3e9a2ed6052786781"`);
            yield queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_e53107478402327ffb3aeaea002"`);
            yield queryRunner.query(`ALTER TABLE "flagged_studios" DROP CONSTRAINT "FK_e295a0057783a37ea9a39cb35c6"`);
            yield queryRunner.query(`ALTER TABLE "flagged_studios" DROP CONSTRAINT "FK_4e2afd30450b1790f958bc68ce0"`);
            yield queryRunner.query(`ALTER TABLE "notification_preferences" DROP CONSTRAINT "FK_64c90edc7310c6be7c10c96f675"`);
            yield queryRunner.query(`ALTER TABLE "calendar" DROP CONSTRAINT "FK_7fd5e60abfdc4ec51b19a3c522a"`);
            yield queryRunner.query(`ALTER TABLE "bankDetail" DROP CONSTRAINT "FK_894bd19eff343c489216eb28925"`);
            yield queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_15d50a87502380623ff0c27e458"`);
            yield queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_3c889a66a116ea3c6f0e10c461f"`);
            yield queryRunner.query(`ALTER TABLE "studio_addons" DROP CONSTRAINT "FK_c2fa2f46da135c3d86e54d4973d"`);
            yield queryRunner.query(`ALTER TABLE "studio" DROP CONSTRAINT "FK_a6b01c9eacf0888b25d8a72dbbd"`);
            yield queryRunner.query(`ALTER TABLE "studio" DROP CONSTRAINT "FK_067eefeee721b7cbf5b5349947e"`);
            yield queryRunner.query(`ALTER TABLE "amenity" DROP CONSTRAINT "FK_07ae0b979fe1c2ec274de1e93a1"`);
            yield queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_37bfb01591406f0fefaed6799a0"`);
            yield queryRunner.query(`DROP INDEX "IDX_8258082117a5c90568752b7305"`);
            yield queryRunner.query(`DROP INDEX "IDX_695aaf6874aa9c5275be39e713"`);
            yield queryRunner.query(`DROP TABLE "appointment_add_ons"`);
            yield queryRunner.query(`DROP TABLE "UserNotification"`);
            yield queryRunner.query(`DROP TABLE "userCard"`);
            yield queryRunner.query(`DROP TABLE "userBankDetail"`);
            yield queryRunner.query(`DROP TABLE "unserviceableLocation"`);
            yield queryRunner.query(`DROP TABLE "support"`);
            yield queryRunner.query(`DROP TABLE "review"`);
            yield queryRunner.query(`DROP TABLE "payout"`);
            yield queryRunner.query(`DROP TABLE "paymentHistory"`);
            yield queryRunner.query(`DROP TABLE "payment"`);
            yield queryRunner.query(`DROP TABLE "message"`);
            yield queryRunner.query(`DROP TABLE "favorite"`);
            yield queryRunner.query(`DROP TABLE "schedule"`);
            yield queryRunner.query(`DROP TABLE "image"`);
            yield queryRunner.query(`DROP TABLE "flagged_studios"`);
            yield queryRunner.query(`DROP TABLE "notification_preferences"`);
            yield queryRunner.query(`DROP TABLE "calendar"`);
            yield queryRunner.query(`DROP TABLE "bankDetail"`);
            yield queryRunner.query(`DROP TABLE "appointment"`);
            yield queryRunner.query(`DROP TABLE "studio_addons"`);
            yield queryRunner.query(`DROP TABLE "studio"`);
            yield queryRunner.query(`DROP TABLE "amenity"`);
            yield queryRunner.query(`DROP TABLE "user"`);
            yield queryRunner.query(`DROP TABLE "location"`);
        });
    }
}
exports.new1642272077147 = new1642272077147;
//# sourceMappingURL=1642272077147-new.js.map