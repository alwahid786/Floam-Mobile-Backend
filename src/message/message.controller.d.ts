import { CommunicationService } from '../communication/communication.service';
import { User } from '../users/user.entity';
import { Message } from './message.entity';
import { CreateMessageDto } from './create.message.dto';
import { MessageService } from './message.service';
import { UserNotificationService } from '../userNotification/userNotification.service';
import { UserService } from '../users/user.service';
interface MessageMetaData {
    user: User;
    hasUnreadMessage: boolean;
}
export declare class MessageController {
    private readonly messageService;
    private readonly commsService;
    private UserNotificationService;
    private userService;
    private log;
    constructor(messageService: MessageService, commsService: CommunicationService, UserNotificationService: UserNotificationService, userService: UserService);
    getMessagesBetweenUsers(senderId: string, receiverId: string): Promise<Message[]>;
    getMessagesSentToUser(userId: string): Promise<MessageMetaData[]>;
    createMessage(createMessageDto: CreateMessageDto): Promise<Message>;
    markMessageAsRead(messageId: string): Promise<Message>;
}
export {};
