import { Repository } from 'typeorm';
import { UserBankDetailDto } from './userBankDetails.dto';
import { UserBankDetail } from './userBankDetail.entity';
export declare class UserBankDetailService {
    private readonly UserBankDetailServiceRepo;
    private log;
    constructor(UserBankDetailServiceRepo: Repository<UserBankDetail>);
    createUserBankDetails(body: UserBankDetailDto): Promise<UserBankDetail>;
    getBankDetails(userId: string): Promise<unknown>;
    editBankDetails(body: UserBankDetailDto, id: string): Promise<unknown>;
    deleteBankDetails(id: string): Promise<import("typeorm").DeleteResult>;
}
