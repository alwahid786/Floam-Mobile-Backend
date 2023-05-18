import { Repository } from 'typeorm';
import { AppGateway } from '../app/app.gateway';
import { Appointment } from '../appointment/appointment.entity';
import { User } from '../users/user.entity';
import { NotificationPreference } from './notification.preference.entity';
export declare enum NOTIFICATIONS {
    APPT_NEW = 1,
    APPT_PAID = 2,
    APPT_CANCELLED = 3
}
export declare class CommunicationService {
    private notificationPreferencesRepo;
    private appGateway;
    private expoClient;
    private log;
    constructor(notificationPreferencesRepo: Repository<NotificationPreference>, appGateway: AppGateway);
    deleteNotificationPrefrence(id: string): Promise<boolean>;
    createDefaultNotificationPreferences(user: User): Promise<NotificationPreference[]>;
    getNotificationPreferences(userId: string): Promise<NotificationPreference[]>;
    saveNotificationPreference(preference: NotificationPreference): Promise<NotificationPreference>;
    sendNewApptNotice(appt: Appointment): Promise<void>;
    sendApptConfirmedNotice(appt: Appointment): Promise<void>;
    sendApptCancelledNotice(appt: Appointment, cancelledByUserId: string): Promise<void>;
    notifyDevice(userId: string): void;
    private sendPushNotification;
}
