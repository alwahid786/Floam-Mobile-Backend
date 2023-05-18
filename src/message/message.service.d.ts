import { Repository } from 'typeorm';
import { CreateMessageDto } from './create.message.dto';
import { Message } from './message.entity';
export declare class MessageService {
    private readonly messageRepo;
    private log;
    constructor(messageRepo: Repository<Message>);
    createMessage(dto: CreateMessageDto): Promise<Message>;
    getMessagesBetweenUsers(senderId: string, receiverId: string): Promise<Message[]>;
    getMessagesForReceiver(receiverId: string): Promise<any>;
    markAsRead(messageId: string): Promise<Message>;
}
