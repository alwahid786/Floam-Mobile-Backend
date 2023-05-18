import { Repository } from 'typeorm';
import { FlagStudio } from '../entities/flag.studio.entity';
import { ReviewService } from '../review/review.service';
import { User } from '../users/user.entity';
import { UserService } from '../users/user.service';
import { StudioDto } from './dto/studio.dto';
import { StudioFilter } from './dto/studio.filter';
import { Studio } from './studio.entity';
export declare class StudioService {
    private readonly studioRepository;
    private readonly flaggedStudioRepo;
    private userService;
    private reviewService;
    private log;
    constructor(studioRepository: Repository<Studio>, flaggedStudioRepo: Repository<FlagStudio>, userService: UserService, reviewService: ReviewService);
    createOrUpdateStudio(studio: Studio): Promise<Studio>;
    getStudiosByIds(studioIds: string[]): Promise<StudioDto[]>;
    getAllStudios(): Promise<StudioDto[]>;
    getStudiosWithFilter(filter: StudioFilter): Promise<StudioDto[]>;
    getStudio(studioId: string): Promise<Studio>;
    getStudioDto(studioId: string): Promise<StudioDto>;
    getStudiosByUser(user: User): Promise<Studio[]>;
    transformToDtos(studios: Studio[]): Promise<StudioDto[]>;
    transformToDto(studio: Studio): Promise<StudioDto>;
    flagStudio(userId: string, studioId: string, text: string): Promise<string>;
    hasActiveStudio(user: User): Promise<boolean>;
}
