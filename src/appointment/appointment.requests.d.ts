import { float } from 'aws-sdk/clients/lightsail';
import { Json } from 'aws-sdk/clients/robomaker';
import { StudioAddOn } from '../studio/studio.addon.entity';
import { Appointment } from './appointment.entity';
export interface GetStudioBookings {
    userId: string;
    currentDate: string;
    studioId: string;
    timeZone: string;
}
export interface GetStudioBookingsResponse {
    [key: string]: Appointment[];
}
export interface GetApptsToReviewResponse {
    asGuest: Appointment[];
    asHost: Appointment[];
}
export interface CreateAppointmentDto {
    studioId: string;
    userId: string;
    startDateTime: string;
    endDateTime: string;
    total: string;
    addOns: StudioAddOn[];
    notes: string;
    numOfGuests: number;
    userCardId: string;
    cardToken: string;
    floamAmount: float;
    paymentIntent: Json;
}
export interface CancelApptReq {
    apptId: string;
    reason: string;
    cancelledByUserId: string;
}
