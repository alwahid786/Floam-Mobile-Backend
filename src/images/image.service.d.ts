import { Repository } from 'typeorm/index';
import { Image, IMAGE_TYPE } from '../entities/image.entity';
import { StudioService } from '../studio/studio.service';
import { UserService } from '../users/user.service';
import { UFile } from '../utils/globalTypes';
export declare class ImageService {
    private readonly imageRepo;
    private readonly studioService;
    private readonly userService;
    private log;
    private s3Client;
    constructor(imageRepo: Repository<Image>, studioService: StudioService, userService: UserService);
    uploadImage(image: UFile, type: IMAGE_TYPE, identifier: string): Promise<{
        src: any;
        type: IMAGE_TYPE;
        studioId: string;
        userId: string;
    } & Image>;
    uploadDocWithoutId(image: UFile): Promise<any>;
    getStudioImages(studioId: string): Promise<Image[]>;
    deleteImages(imageIds: any): Promise<void>;
    getUserProfileImage(userId: string, type: any): Promise<Image>;
}
