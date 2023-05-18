import { Repository } from 'typeorm';
import { PayoutDto } from './payout.dto';
import { Payout } from './payout.entity';
export declare class PayoutService {
    private readonly PayoutServiceRepo;
    private log;
    constructor(PayoutServiceRepo: Repository<Payout>);
    createPayout(dto: PayoutDto): Promise<Payout>;
    update(id: string, body: any): Promise<Payout | "payout already approved." | "payout already rejected.">;
    updateByStudio(body: any): Promise<Payout[]>;
    getUserPayouts(userId: string): Promise<Payout[]>;
    getAllPayouts(): Promise<Payout[]>;
    getAllPayoutsByFilter(body: any): Promise<Payout[]>;
    getPayoutOfAppointment(appointmentId: string): Promise<string>;
    getPayoutWithDates(startDate: any, endDate: any): Promise<Payout[]>;
    createTransferringToConnectAccount(payout: any, user: any): Promise<Payout>;
    createPayoutToBankAccount(payout: any, bankDetail: any, user: any): Promise<Payout>;
}
