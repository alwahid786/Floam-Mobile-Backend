import { UserNotificationService } from './userNotification.service';
export declare class UserNotificationController {
    private readonly userNotificationService;
    private log;
    constructor(userNotificationService: UserNotificationService);
    getUserNotifications(userId: string): Promise<import("./userNotification.entity").UserNotification[]>;
    markMessageAsRead(notificationId: string): Promise<import("./userNotification.entity").UserNotification>;
    getDot(userId: string): Promise<boolean>;
}
