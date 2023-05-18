import { Image, IMAGE_TYPE } from '../entities/image.entity';
import { UFile } from '../utils/globalTypes';
import { ImageService } from './image.service';
export declare class ImageController {
    private readonly imageService;
    private log;
    constructor(imageService: ImageService);
    getStudioImages(studioId: string): Promise<Image[]>;
    getUserProfileImage(userId: string, type: string): Promise<Image>;
    uploadFile(image: UFile, identifier: string, type: IMAGE_TYPE): Promise<{
        src: any;
        type: IMAGE_TYPE;
        studioId: string;
        userId: string;
    } & Image>;
    uploadFileWithoutId(image: UFile): Promise<any>;
    deleteStudioImages(imageIds: [string]): Promise<string>;
}
