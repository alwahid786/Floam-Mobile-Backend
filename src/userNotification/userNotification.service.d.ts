import { Repository } from 'typeorm';
import { UserNotification } from './userNotification.entity';
export declare class UserNotificationService {
    private readonly userNotificationRepo;
    private log;
    constructor(userNotificationRepo: Repository<UserNotification>);
    createNotification(text: string, userId: string, type: string, entityId: string): Promise<{
        text: string;
        userId: string;
        type: string;
        entityId: string;
        wasRead: boolean;
    } & UserNotification>;
    findReadNotification(userNotifications: any): Promise<any>;
    getNotificationsByUser(userId: string): Promise<UserNotification[]>;
    getNotificationsByUserForDot(userId: string): Promise<UserNotification>;
    markAsRead(notificationId: string): Promise<UserNotification>;
}
