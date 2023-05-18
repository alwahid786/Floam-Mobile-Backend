import { BaseEntity } from '../base/base.entity';
import { Studio } from '../studio/studio.entity';
import { User } from '../users/user.entity';
export declare class FlagStudio extends BaseEntity {
    studioId: string;
    studio: Studio;
    userId: string;
    user: User;
}
