import { User } from '../users/user.entity';
import { BaseEntity } from '../base/base.entity';
export declare class Support extends BaseEntity {
    text: string;
    type: string;
    userId: string;
    user?: User;
}
