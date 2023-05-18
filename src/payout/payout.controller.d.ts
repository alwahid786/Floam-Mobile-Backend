import { PayoutService } from './payout.service';
import { PayoutDto } from './payout.dto';
import { UserService } from '../users/user.service';
import { Payout } from './payout.entity';
import { AppointmentService } from '../appointment/appointment.service';
import { UserNotificationService } from '../userNotification/userNotification.service';
import { PaymentHistoryService } from '../paymentHistory/paymentHistory.service';
import { BankDetailService } from '../bankDetail/bankDetail.service';
export declare class PayoutController {
    private readonly payoutService;
    private userService;
    private bankDetailService;
    private appointmentService;
    private UserNotificationService;
    private paymentHistoryService;
    cron: any;
    cron2: any;
    private log;
    constructor(payoutService: PayoutService, userService: UserService, bankDetailService: BankDetailService, appointmentService: AppointmentService, UserNotificationService: UserNotificationService, paymentHistoryService: PaymentHistoryService);
    createPayout(payoutDto: PayoutDto): Promise<Payout>;
    createTransfer(body: any): Promise<unknown>;
    updatePayout(id: string, body: any): Promise<string | Payout>;
    updatePayoutByStudio(body: any): Promise<Payout[]>;
    getAllPayouts(userId: string): Promise<Payout[]>;
    getAllTodayPayout(): Promise<{
        todayPayout: Payout[];
        allPayouts: Payout[];
        allPayments: import("../paymentHistory/paymentHistory.entity").PaymentHistory[];
    }>;
    getAllPayoutsByFilter(body: any): Promise<Payout[]>;
    genratePaymentLink(body: any): Promise<{
        result: string;
        message: string;
        payment_intent: any;
        payment_intent_complete: any;
        ephemeral_key: any;
        customer_id: any;
        publishablekey: string;
        secret: string;
    }>;
    connectStripe(): Promise<{
        status: string;
        url: string;
    }>;
}
