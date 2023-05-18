import { Repository } from 'typeorm';
import { BankDetailDto } from './bankDetail.dto';
import { BankDetail } from './bankDetail.entity';
export declare class BankDetailService {
    private readonly BankDetailServiceRepo;
    private log;
    constructor(BankDetailServiceRepo: Repository<BankDetail>);
    createEntry(stripeBankToken: BankDetailDto): Promise<BankDetail>;
    getBankDetailsByUser(userId: string): Promise<BankDetail[]>;
    deleteBankDetail(id: string): Promise<string>;
    update(id: string, bankDetailDto: any): Promise<import("typeorm").UpdateResult>;
    createBankToken(data: any, user: any): Promise<BankDetailDto>;
    getEntry(userId: string): Promise<BankDetail | "not found">;
}
