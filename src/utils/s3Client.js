"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
const ACCESS_KEY_ID = 'AKIASPLOM7G6XH52MNX6';
const SECRET_ACCESS_KEY = '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';
console.log(ACCESS_KEY_ID, SECRET_ACCESS_KEY);
const BUCKET_NAME = 'floam-images-dev';
class S3Client {
    constructor() {
        this.client = new AWS.S3({
            apiVersion: '2006-03-01',
            secretAccessKey: SECRET_ACCESS_KEY,
            accessKeyId: ACCESS_KEY_ID,
        });
    }
    uploadStudioPicture(file, studioId) {
        const hash = S3Client.randomHash();
        return this.uploadToS3(file, `profile-picture/studio:${studioId}/${hash}`);
    }
    uploadProfilePicture(file, userId) {
        const hash = S3Client.randomHash();
        return this.uploadToS3(file, `profile-picture/user:${userId}/${hash}`);
    }
    uploadDocWithoutId(file) {
        const hash = S3Client.randomHash();
        return this.uploadToS3(file, `doc-link/${hash}`);
    }
    uploadGovernmentId(file, userId) {
        const hash = S3Client.randomHash();
        return this.uploadToS3(file, `government-id/user:${userId}/${hash}`);
    }
    uploadDocLink(file, userId) {
        const hash = S3Client.randomHash();
        return this.uploadToS3(file, `doc-link/user:${userId}/${hash}`);
    }
    uploadToS3(file, key) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(file.originalname);
            const params = {
                Bucket: BUCKET_NAME,
                Key: key || `sample-app/${file.originalname}`,
                Body: file.buffer,
                ACL: 'public-read',
            };
            const response = yield this.client
                .upload(params)
                .promise();
            console.log(response);
            return response.Location;
        });
    }
    static randomHash() {
        return (Math.random().toString(36).substring(2, 5) +
            Math.random().toString(36).substring(2, 5));
    }
}
exports.default = S3Client;
//# sourceMappingURL=s3Client.js.map