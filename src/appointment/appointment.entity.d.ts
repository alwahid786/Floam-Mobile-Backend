import { BaseEntity } from '../base/base.entity';
import { StudioAddOn } from '../studio/studio.addon.entity';
import { Studio } from '../studio/studio.entity';
import { User } from '../users/user.entity';
import { float } from 'aws-sdk/clients/lightsail';
import { Json } from 'aws-sdk/clients/robomaker';
export declare enum APPT_STATUSES {
    PAID = "paid",
    PENDING = "pending",
    CONFIRMED = "confirmed",
    CANCELLED = "cancelled"
}
export declare class Appointment extends BaseEntity {
    start: Date;
    end: Date;
    total: string;
    studioId: string;
    paymentIntent: Json;
    studio?: Studio;
    userId: string;
    user?: User;
    hostLeftReview: boolean;
    artistLeftReview: boolean;
    cancelledAt?: Date;
    cancellationReason?: string;
    cancelledByUserId?: string;
    addOns: StudioAddOn[];
    notes?: string;
    numOfGuests: number;
    status: APPT_STATUSES;
    notificationSent: boolean;
    isEarning: boolean;
    floamAmount: float;
}
