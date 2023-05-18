import { AppointmentService } from '../appointment/appointment.service';
import { StudioService } from '../studio/studio.service';
import { UserService } from '../users/user.service';
import { GetReviewsCountResponse, GetReviewsForStudioByUserResponse, SaveReviewDto, SeedReviewsBody } from './review.api-objects';
import { Review } from './review.entity';
import { ReviewService } from './review.service';
export declare class ReviewController {
    private reviewService;
    private studioService;
    private userService;
    private apptService;
    private log;
    constructor(reviewService: ReviewService, studioService: StudioService, userService: UserService, apptService: AppointmentService);
    getAllReviews(studioId: string): Promise<Review[]>;
    getReviewsForStudioByUser(userId: string): Promise<GetReviewsForStudioByUserResponse>;
    getReviewsCount(): Promise<GetReviewsCountResponse>;
    submitReview(reviewDto: SaveReviewDto): Promise<Review>;
    seedDB(body: SeedReviewsBody): Promise<string>;
}
