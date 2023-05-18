import { User } from '../users/user.entity';
import { BaseEntity } from '../base/base.entity';
export declare class UserNotification extends BaseEntity {
    text: string;
    type: string;
    entityId: string;
    userId: string;
    user?: User;
    wasRead: boolean;
}
