import { supportService } from './support.service';
import { supportDto } from './support.dto';
import { UserService } from '../users/user.service';
import { StudioService } from '../studio/studio.service';
import { Support } from './support.entity';
export declare class SupportController {
    private readonly supportService;
    private userService;
    private studioService;
    private log;
    constructor(supportService: supportService, userService: UserService, studioService: StudioService);
    createSupport(supportDto: supportDto): Promise<Support>;
    getAllSupports(): Promise<Support[]>;
    createChatReport(userId: string, toUserId: string, text: string): Promise<string>;
}
