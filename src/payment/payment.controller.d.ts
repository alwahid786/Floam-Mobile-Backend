import { CreateCardDto } from './payment.objects';
import { PaymentService } from './payment.service';
export declare class PaymentController {
    private readonly paymentService;
    private log;
    constructor(paymentService: PaymentService);
    getCardsInfoForUser(userId: string): Promise<import("./payment.objects").Card[]>;
    registerCardInfo(data: CreateCardDto): Promise<import("./payment.entity").Payment>;
    removeCardInfo(userId: string, cardId: string): Promise<string>;
    genratePaymentLink(amount: string): string;
}
