import { Appointment } from '../appointment/appointment.entity';
import { BaseEntity } from '../base/base.entity';
import { Studio } from '../studio/studio.entity';
import { User } from '../users/user.entity';
export declare enum LEFT_BY_TYPES {
    ARTIST = "artist",
    STUDIO_MANAGER = "studio_manager"
}
export declare class Review extends BaseEntity {
    rating: number;
    cleanlinessRating: number;
    timelinessRating: number;
    communicationRating: number;
    isExpectations: boolean;
    isRecommendations: boolean;
    comment: string;
    privateComment: string | null;
    studioId: string;
    studio?: Studio;
    appointmentId: string;
    appointment?: Appointment;
    leftByUserType: LEFT_BY_TYPES;
    leftByUserId: string;
    leftByUser?: User;
}
