import { UserService } from '../users/user.service';
import { LoginDTO } from './auth.dto';
import { FacebookLoginDTO } from './auth.dto';
import { GoogleLoginDTO } from './auth.dto';
import { AppleLoginDTO } from './auth.dto';
export declare class AuthService {
    private usersService;
    constructor(usersService: UserService);
    signPayload(payload: LoginDTO): string;
    signFacebookPayload(payload: FacebookLoginDTO): string;
    signGooglePayload(payload: GoogleLoginDTO): string;
    signApplePayload(payload: AppleLoginDTO): string;
    validateUser(payload: LoginDTO): Promise<any>;
    validateFacebookUser(payload: FacebookLoginDTO): Promise<any>;
    validateGoogleUser(payload: GoogleLoginDTO): Promise<any>;
    validateAppleUser(payload: AppleLoginDTO): Promise<any>;
}
