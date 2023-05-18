import { Repository } from 'typeorm';
import { PaymentHistory } from './paymentHistory.entity';
export declare class PaymentHistoryService {
    private readonly paymentHistoryRepo;
    private log;
    constructor(paymentHistoryRepo: Repository<PaymentHistory>);
    createPaymentLog(user: any, payment_intent: any, total: any, type: any, appointmentId: any): Promise<any>;
    createRefundLog: (user: any, studioUserId: any, charge: any, total: any, type: any, artistUserAmount: any, apptId: any) => Promise<any>;
    saveAppointmentId(paymentHistory: any): Promise<any>;
    createCharge: (data: any, uniqueKey: any) => Promise<unknown>;
    createCardToken: (data: any) => Promise<any>;
    getPaymentByUser(userId: string): Promise<PaymentHistory[]>;
    getPaymentByTransactionId(appointmentId: string): Promise<PaymentHistory>;
    getDayEarning: (date: any, userId: any) => Promise<unknown>;
    getWeekEarning: (date: any, userId: any) => Promise<unknown>;
    getTodayPayments: () => Promise<number>;
    getMonthEarning: (date: any, userId: any) => Promise<unknown>;
    getAllPayments: () => Promise<PaymentHistory[]>;
    createRefund: (data: any) => Promise<any>;
    getEarnings(userId: string): Promise<string>;
}
