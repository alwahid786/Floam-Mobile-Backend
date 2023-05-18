import { BaseEntity } from '../base/base.entity';
import { User } from '../users/user.entity';
export interface PaymentCard {
    cardId: string;
    isDefault: boolean;
}
export declare class Payment extends BaseEntity {
    userId: string;
    user?: User;
    stripeCustomerId: string;
    cards: PaymentCard[];
}
