import { User } from '../users/user.entity';
import { BaseEntity } from '../base/base.entity';
export declare class Message extends BaseEntity {
    senderId: string;
    sender?: User;
    receiverId: string;
    receiver?: User;
    content: string;
    wasRead: boolean;
}
