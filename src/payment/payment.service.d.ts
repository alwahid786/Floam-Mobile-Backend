import { User } from '../users/user.entity';
import { Payment, PaymentCard } from './payment.entity';
import { Card, CreateCardDto } from './payment.objects';
import { PaymentRepository } from './payment.repository';
export declare class PaymentService {
    private readonly paymentRepo;
    private log;
    constructor(paymentRepo: PaymentRepository);
    create(user: User): Promise<Payment>;
    deleteCard(userId: string, cardId: string): Promise<Payment>;
    processPayment(userId: string, amount: number): Promise<void>;
    registerCard(data: CreateCardDto): Promise<Payment>;
    getCards(userId: string): Promise<Card[]>;
    transformToCard(customerId: string, pCard: PaymentCard): Promise<Card>;
}
