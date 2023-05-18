import { BankDetailService } from './bankDetail.service';
import { BankDetailDto } from './bankDetail.dto';
import { UserService } from '../users/user.service';
import { BankDetail } from './bankDetail.entity';
export declare class BankDetailController {
    private readonly bankDetailService;
    private userService;
    private log;
    constructor(bankDetailService: BankDetailService, userService: UserService);
    createBankDetail(bankDetailDto: BankDetailDto): Promise<BankDetail>;
    getBankDetails(userId: string): Promise<BankDetail[]>;
    removeCardInfo(id: string): Promise<string>;
    updateBankDetail(id: string, bankDetailDto: BankDetailDto): Promise<unknown>;
}
