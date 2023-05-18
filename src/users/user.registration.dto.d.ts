import { LocationDto } from '../location/location.dto';
export interface UserRegistrationDto {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    dateOfBirth: string;
    docLink: string;
    bio: string;
    gender: string;
    ethnicity?: string;
    location: LocationDto;
    artistName?: string;
    facebookId: string;
    googleId: string;
    appleId: string;
    loginType: string;
    isNewUser: boolean;
    customerId: string;
    clientConnectId: string;
}
