import { Repository } from 'typeorm';
import { Studio } from '../studio/studio.entity';
import { User } from '../users/user.entity';
import { Review } from './review.entity';
import { GetReviewsCountResponse } from './review.api-objects';
export declare class ReviewService {
    private readonly reviewRepo;
    private readonly studioRepo;
    private log;
    constructor(reviewRepo: Repository<Review>, studioRepo: Repository<Studio>);
    createReview(review: Review): Promise<Review>;
    getReviewsByStudio(studio: Studio): Promise<Review[]>;
    getReviewsByUser(user: User): Promise<Review[]>;
    getReviewsCount(): Promise<GetReviewsCountResponse>;
    calculateAverageRating(reviews: Review[]): Promise<number>;
    seedReviews(user: User, studio: Studio): Promise<void>;
    addRating(review: Review): Promise<number>;
}
