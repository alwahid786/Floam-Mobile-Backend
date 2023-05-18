import { BaseEntity } from '../base/base.entity';
import { User } from '../users/user.entity';
export declare enum NotificationPreferenceTypes {
    REMINDERS = "REMINDERS",
    MESSAGES = "MESSAGES",
    PROMOTIONS = "PROMOTIONS",
    SUPPORT = "SUPPORT"
}
export declare class NotificationPreference extends BaseEntity {
    type: NotificationPreferenceTypes;
    email: boolean;
    sms: boolean;
    push: boolean;
    userId: string;
    user: User;
}
