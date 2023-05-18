import { PaymentHistoryService } from './paymentHistory.service';
import { PaymentHistory } from './paymentHistory.entity';
import { UserService } from '../users/user.service';
import { AppointmentService } from '../appointment/appointment.service';
export declare class PaymentHistoryController {
    private readonly paymentHistoryService;
    private readonly appointmentService;
    private userService;
    private log;
    constructor(paymentHistoryService: PaymentHistoryService, appointmentService: AppointmentService, userService: UserService);
    getUserPayments(userId: string): Promise<PaymentHistory[]>;
    earnings(userId: string): Promise<string>;
    todayPayment(): Promise<number>;
}
