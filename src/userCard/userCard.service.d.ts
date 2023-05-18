import { PaymentHistoryService } from '../paymentHistory/paymentHistory.service';
import { Repository } from 'typeorm';
import { userCardDto } from './userCard.dto';
import { UserCard } from './userCard.entity';
export declare class UserCardService {
    private readonly UserCardServiceRepo;
    private paymentHistoryService;
    private log;
    constructor(UserCardServiceRepo: Repository<UserCard>, paymentHistoryService: PaymentHistoryService);
    createCard: (dto: userCardDto) => Promise<{
        name: string;
        cardNumber: string;
        expMonth: string;
        expYear: string;
        userId: string;
        brand: any;
        cardToken: any;
    } & UserCard>;
    getCardsByUser(userId: string): Promise<UserCard[]>;
    deleteCard(cardId: string): Promise<string>;
    getUserCard(cardId: string): Promise<UserCard>;
}
