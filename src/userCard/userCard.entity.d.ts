import { User } from '../users/user.entity';
import { BaseEntity } from '../base/base.entity';
export declare class UserCard extends BaseEntity {
    name: string;
    cardNumber: string;
    expMonth: string;
    expYear: string;
    cardToken: string;
    brand: string;
    userId: string;
    user?: User;
}
