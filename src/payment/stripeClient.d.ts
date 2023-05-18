import Stripe from 'stripe';
import { User } from '../users/user.entity';
import 'dotenv/config';
declare const stripeClient: Stripe;
export declare function createUserInStripe(user: User): Promise<string>;
export { Stripe };
export default stripeClient;
