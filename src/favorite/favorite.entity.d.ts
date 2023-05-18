import { BaseEntity } from '../base/base.entity';
import { Studio } from '../studio/studio.entity';
import { User } from '../users/user.entity';
export declare class Favorite extends BaseEntity {
    userId?: string;
    user: User;
    studioId?: string;
    studio: Studio;
}
