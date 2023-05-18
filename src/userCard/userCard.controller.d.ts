import { UserCardService } from './userCard.service';
import { userCardDto } from './userCard.dto';
import { UserService } from '../users/user.service';
import { UserCard } from './userCard.entity';
export declare class UserCardController {
    private readonly userCardService;
    private userService;
    private log;
    constructor(userCardService: UserCardService, userService: UserService);
    createUserCard(userCardDto: userCardDto): Promise<UserCard>;
    getUserCards(userId: string): Promise<UserCard[]>;
    removeCardInfo(id: string): Promise<string>;
}
