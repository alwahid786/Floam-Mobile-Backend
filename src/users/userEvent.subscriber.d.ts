import { EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { User } from './user.entity';
export declare class UserEventSubscriber implements EntitySubscriberInterface<User> {
    listenTo(): typeof User;
    beforeInsert(event: InsertEvent<User>): Promise<any>;
}
