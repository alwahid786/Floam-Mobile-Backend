import { UFile } from './globalTypes';
export default class S3Client {
    private client;
    constructor();
    uploadStudioPicture(file: UFile, studioId: string): Promise<string>;
    uploadProfilePicture(file: UFile, userId: string): Promise<string>;
    uploadDocWithoutId(file: UFile): Promise<string>;
    uploadGovernmentId(file: UFile, userId: string): Promise<string>;
    uploadDocLink(file: UFile, userId: string): Promise<string>;
    private uploadToS3;
    private static randomHash;
}
