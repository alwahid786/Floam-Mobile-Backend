import { UserService } from "../users/user.service";
import { UserBankDetail } from "./userBankDetail.entity";
import { UserBankDetailService } from "./userBankDetail.service";
import { UserBankDetailDto } from "./userBankDetails.dto";
export declare class UserBankDetailController {
    private readonly userBankDetailService;
    private userService;
    constructor(userBankDetailService: UserBankDetailService, userService: UserService);
    CreateBankdetail(userBankDetailDto: UserBankDetailDto): Promise<UserBankDetail>;
    getBankDetails(userId: string): Promise<unknown>;
    editBankDetails(userBankDetailDto: UserBankDetailDto, id: string): Promise<unknown>;
    deleteBankDetail(id: string): Promise<import("typeorm").DeleteResult>;
}
