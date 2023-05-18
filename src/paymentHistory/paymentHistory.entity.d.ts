import { BaseEntity } from '../base/base.entity';
import { Appointment } from '../appointment/appointment.entity';
import { User } from '../users/user.entity';
export declare class PaymentHistory extends BaseEntity {
    userId: string;
    user?: User;
    amount: number;
    status: string;
    text: string;
    transactionId: string;
    appointmentId: string;
    appointment?: Appointment;
}
