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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.CommunicationService = exports.NOTIFICATIONS = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const date_fns_1 = require("date-fns");
const expo_server_sdk_1 = require("expo-server-sdk");
const typeorm_2 = require("typeorm");
const app_gateway_1 = require("../app/app.gateway");
const appointment_entity_1 = require("../appointment/appointment.entity");
const notification_preference_entity_1 = require("./notification.preference.entity");
var NOTIFICATIONS;
(function (NOTIFICATIONS) {
    NOTIFICATIONS[NOTIFICATIONS["APPT_NEW"] = 1] = "APPT_NEW";
    NOTIFICATIONS[NOTIFICATIONS["APPT_PAID"] = 2] = "APPT_PAID";
    NOTIFICATIONS[NOTIFICATIONS["APPT_CANCELLED"] = 3] = "APPT_CANCELLED";
})(NOTIFICATIONS = exports.NOTIFICATIONS || (exports.NOTIFICATIONS = {}));
const MessagesMap = {
    [NOTIFICATIONS.APPT_NEW]: `Congratulations! someone booked a new session at your studio.`,
    [NOTIFICATIONS.APPT_PAID]: `Awesome! your session has confirmed.`,
    [NOTIFICATIONS.APPT_CANCELLED]: `Oh no! your session was cancelled.`,
};
let CommunicationService = class CommunicationService {
    constructor(notificationPreferencesRepo, appGateway) {
        this.notificationPreferencesRepo = notificationPreferencesRepo;
        this.appGateway = appGateway;
        this.log = new common_1.Logger('CommunicationService');
        this.expoClient = new expo_server_sdk_1.Expo();
    }
    deleteNotificationPrefrence(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkNotification = yield this.getNotificationPreferences(id);
            var message = "";
            checkNotification.forEach((notificationPref) => __awaiter(this, void 0, void 0, function* () {
                message = message + "  == > " + notificationPref.id;
                this.notificationPreferencesRepo.delete(notificationPref.id);
            }));
            return true;
        });
    }
    createDefaultNotificationPreferences(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const preferences = [];
            Object.keys(notification_preference_entity_1.NotificationPreferenceTypes).forEach(type => {
                const preference = {
                    type: notification_preference_entity_1.NotificationPreferenceTypes[type],
                    userId: user.id,
                    user,
                    email: true,
                    sms: true,
                    push: true,
                };
                preferences.push(preference);
            });
            return yield this.notificationPreferencesRepo.save(preferences);
        });
    }
    getNotificationPreferences(userId) {
        return this.notificationPreferencesRepo.find({
            where: { userId }
        });
    }
    saveNotificationPreference(preference) {
        return this.notificationPreferencesRepo.save(preference);
    }
    sendNewApptNotice(appt) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user: { pushToken } } = appt.studio;
            const msg = MessagesMap[NOTIFICATIONS.APPT_NEW];
            yield this.sendPushNotification(pushToken, msg);
            if (appt.status === appointment_entity_1.APPT_STATUSES.PAID) {
                yield this.sendApptConfirmedNotice(appt);
            }
        });
    }
    sendApptConfirmedNotice(appt) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user: { pushToken }, start, } = appt;
            const formattedDate = date_fns_1.format(start, 'MMM do, yyyy @ hh:mm aa');
            const msg = `Your appointment on ${formattedDate} has been confirmed.`;
            console.log(msg);
            yield this.sendPushNotification(pushToken, msg);
            this.log.log(`Successfully sent ApptConfirmed notice`);
        });
    }
    sendApptCancelledNotice(appt, cancelledByUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { start, user: { id: artistId, pushToken: artistPushToken }, studio: { id: managerId, user: { pushToken: managerPushToken } }, } = appt;
            const formattedDate = date_fns_1.format(start, 'MMM do, yyyy @ hh:mm aa');
            if (cancelledByUserId === artistId) {
                const msg = `Oh no! The artist cancelled their appointment for ${formattedDate}.`;
                yield this.sendPushNotification(managerPushToken, msg);
                this.log.log(`Successfully sent ApptCancelled:ByArtist notice`);
            }
            else if (cancelledByUserId === managerId) {
                const msg = `Oh no! Your appointment on ${formattedDate} has been cancelled.`;
                yield this.sendPushNotification(artistPushToken, msg);
                this.log.log(`Successfully sent ApptCancelled:ByManager notice`);
            }
        });
    }
    notifyDevice(userId) {
        const sentIndicator = this.appGateway.notifyClients(userId);
        this.log.debug(`was the device notified? ${sentIndicator}`);
    }
    sendPushNotification(token, body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!expo_server_sdk_1.Expo.isExpoPushToken(token)) {
                this.log.error(`Push token ${token} is not a valid Expo push token`);
                return;
            }
            const message = {
                to: token,
                sound: 'default',
                body,
            };
            const tickets = yield this.expoClient.sendPushNotificationsAsync([message]);
            this.log.debug(tickets);
        });
    }
};
CommunicationService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(notification_preference_entity_1.NotificationPreference)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        app_gateway_1.AppGateway])
], CommunicationService);
exports.CommunicationService = CommunicationService;
//# sourceMappingURL=communication.service.js.map