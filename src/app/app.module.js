"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth/auth.module");
const calendar_module_1 = require("../calendar/calendar.module");
const communication_module_1 = require("../communication/communication.module");
const appointment_module_1 = require("../appointment/appointment.module");
const favorite_module_1 = require("../favorite/favorite.module");
const location_module_1 = require("../location/location.module");
const seeder_module_1 = require("../seeder/seeder.module");
const payment_module_1 = require("../payment/payment.module");
const app_controller_1 = require("./app.controller");
const app_gateway_1 = require("./app.gateway");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const ormconfig = require("../../ormconfig");
const user_module_1 = require("../users/user.module");
const studio_module_1 = require("../studio/studio.module");
const review_module_1 = require("../review/review.module");
const message_module_1 = require("../message/message.module");
const image_module_1 = require("../images/image.module");
const support_module_1 = require("../support/support.module");
const paymentHistory_module_1 = require("../paymentHistory/paymentHistory.module");
const userCard_module_1 = require("../userCard/userCard.module");
const unserviceableLocation_module_1 = require("../unserviceableLocation/unserviceableLocation.module");
const bankDetail_module_1 = require("../bankDetail/bankDetail.module");
const payout_module_1 = require("../payout/payout.module");
const userBankDetail_module_1 = require("../userBankDetails/userBankDetail.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path_1.join(__dirname, '../..', 'public'),
            }),
            typeorm_1.TypeOrmModule.forRoot(ormconfig),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            studio_module_1.StudioModule,
            review_module_1.ReviewModule,
            message_module_1.MessageModule,
            image_module_1.ImageModule,
            appointment_module_1.AppointmentModule,
            seeder_module_1.SeederModule,
            favorite_module_1.FavoriteModule,
            communication_module_1.CommunicationModule,
            payment_module_1.PaymentModule,
            location_module_1.LocationModule,
            calendar_module_1.CalendarModule,
            support_module_1.SupportModule,
            paymentHistory_module_1.PaymentHistoryModule,
            userCard_module_1.UserCardModule,
            unserviceableLocation_module_1.UnserviceableLocationModule,
            bankDetail_module_1.BankDetailModule,
            payout_module_1.PayoutModule,
            userBankDetail_module_1.UserBankDetailModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, app_gateway_1.AppGateway, common_1.Logger],
        exports: [app_gateway_1.AppGateway],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map