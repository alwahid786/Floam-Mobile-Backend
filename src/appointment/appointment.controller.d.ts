import { StudioService } from '../studio/studio.service';
import { UserService } from '../users/user.service';
import { CancelApptReq, CreateAppointmentDto, GetApptsToReviewResponse, GetStudioBookings } from './appointment.requests';
import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment.entity';
import { PayoutService } from '../payout/payout.service';
import { UserNotificationService } from '../userNotification/userNotification.service';
import { PaymentHistoryService } from '../paymentHistory/paymentHistory.service';
import { PaymentService } from '../payment/payment.service';
import { UserCardService } from '../userCard/userCard.service';
export declare class AppointmentController {
    private studioService;
    private appointmentService;
    private userService;
    private UserNotificationService;
    private payoutService;
    private paymentHistoryService;
    private readonly paymentService;
    private readonly userCardService;
    cron: any;
    cron2: any;
    private log;
    constructor(studioService: StudioService, appointmentService: AppointmentService, userService: UserService, UserNotificationService: UserNotificationService, payoutService: PayoutService, paymentHistoryService: PaymentHistoryService, paymentService: PaymentService, userCardService: UserCardService);
    cancelAppointments(apptId: string): Promise<boolean>;
    getStudioBookings(studioBookingsRequest: GetStudioBookings): Promise<import("./appointment.requests").GetStudioBookingsResponse>;
    getAllStudioBookings(studioId: string): Promise<Appointment[]>;
    getAllStudioBooking(studioId: string): Promise<Appointment[]>;
    reserveStudio(data: CreateAppointmentDto): Promise<string>;
    getApptsToReview(userId: string): Promise<GetApptsToReviewResponse>;
    cancelAppointment(body: CancelApptReq): Promise<Appointment>;
    confirmAppointment(apptId: string): Promise<Appointment>;
    createChatReport(cardNumber: string, expMonth: string, expYear: string, cvc: string): Promise<any>;
    getTimings(studioId: string): Promise<any[]>;
}