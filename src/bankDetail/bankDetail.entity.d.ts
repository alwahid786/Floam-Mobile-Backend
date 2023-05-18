import { User } from '../users/user.entity';
import { BaseEntity } from '../base/base.entity';
export declare class BankDetail extends BaseEntity {
    name: string;
    bankName: string;
    routingNumber: string;
    accountNumber: string;
    bankToken?: string;
    bankAccountToken?: string;
    userId: string;
    user?: User;
}
