import { User } from '../users/user.entity';
import { BaseEntity } from '../base/base.entity';
import { Appointment } from '../appointment/appointment.entity';
import { Json } from 'aws-sdk/clients/robomaker';
export declare enum PAYOUT_STATUSES {
    REQUESTED = "requested",
    APPROVED = "approved",
    REJECTED = "rejected"
}
export declare class Payout extends BaseEntity {
    totalAmount: number;
    floamAmount: number;
    studioUserAmount: number;
    userId: string;
    responseData: Json;
    status: PAYOUT_STATUSES;
    user?: User;
    appointmentId: string;
    appointment?: Appointment;
    stripeUserPayoutId?: string;
    amountSend: boolean;
}
