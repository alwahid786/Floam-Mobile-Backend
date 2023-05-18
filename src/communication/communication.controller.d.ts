import { UserService } from '../users/user.service';
import { PushTokenBody } from './comms.objects';
import { CommunicationService } from './communication.service';
import { NotificationPreference } from './notification.preference.entity';
export declare class CommunicationController {
    private commsService;
    private userService;
    constructor(commsService: CommunicationService, userService: UserService);
    savePreferences(preference: NotificationPreference): Promise<NotificationPreference>;
    getPreferences(userId: string): Promise<NotificationPreference[]>;
    addPushToken({ userId, token }: PushTokenBody): Promise<string>;
}
