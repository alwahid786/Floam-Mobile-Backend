import { PaymentService } from '../payment/payment.service';
import { CommunicationService } from '../communication/communication.service';
import { User } from './user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly userRepository;
    private commsService;
    private paymentService;
    private log;
    constructor(userRepository: Repository<User>, commsService: CommunicationService, paymentService: PaymentService);
    createOrUpdateUser(userData: User): Promise<User>;
    getUser(userId: string): Promise<User>;
    deleteUserAcount(id: string): Promise<any>;
    getAll(): Promise<User[]>;
    getByLoginInfo(email: string, password: string): Promise<User>;
    registerUser(user: User): Promise<User>;
    registerSocialUser(user: User): Promise<User>;
    getUserFromEmail(email: string): Promise<User>;
    createCustomAccountForUser(data: any): Promise<{
        id: string;
    }>;
    sendPush(userID: string, message: string, title: string): Promise<void>;
}
