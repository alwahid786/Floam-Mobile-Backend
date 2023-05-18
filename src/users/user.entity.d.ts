import { BaseEntity } from '../base/base.entity';
import { Location } from '../location/location.entity';
export declare enum USER_STATUS {
    ACTIVE = "ACTIVE",
    REGISTRATION = "REGISTRATION"
}
export declare class User extends BaseEntity {
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    clientConnectId: string;
    docLink: string;
    phone?: string;
    dateOfBirth?: string;
    gender?: string;
    ethnicity?: string;
    bio?: string;
    location?: Location | null;
    pushToken?: string;
    artistName?: string;
    status?: USER_STATUS | null;
    facebookId?: string;
    googleId?: string;
    appleId?: string;
    customerId?: string;
    loginType?: string;
    isNewUser: boolean;
}
