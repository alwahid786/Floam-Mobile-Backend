import { BaseEntity } from '../base/base.entity';
import { Studio } from '../studio/studio.entity';
import { User } from '../users/user.entity';
export declare enum IMAGE_TYPE {
    PROFILE = "profile_pic",
    STUDIO = "studio_pic",
    GID = "government_id",
    DOCLINK = "doc_link"
}
export declare class Image extends BaseEntity {
    src: string;
    type: IMAGE_TYPE;
    studioId?: string;
    studio?: Studio | null;
    userId?: string;
    user?: User | null;
}
