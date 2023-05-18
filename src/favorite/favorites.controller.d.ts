import { Repository } from 'typeorm';
import { StudioDto } from '../studio/dto/studio.dto';
import { StudioService } from '../studio/studio.service';
import { UserService } from '../users/user.service';
import { Favorite } from './favorite.entity';
interface AddFavoriteReq {
    userId: string;
    studioId: string;
    isLiked: boolean;
}
export declare class FavoritesController {
    private readonly favoritesRepo;
    private userService;
    private studioService;
    private log;
    constructor(favoritesRepo: Repository<Favorite>, userService: UserService, studioService: StudioService);
    getFavoritesForUser(userId: string, justIds: boolean): Promise<Favorite[] | StudioDto[]>;
    addFavorite(body: AddFavoriteReq): Promise<"favorite saved!" | "favorite removed.">;
}
export {};
