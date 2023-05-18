import { UserRegistrationDto } from '../users/user.registration.dto';
import { UserService } from '../users/user.service';
import { AuthResponseDTO, LoginDTO } from './auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    login(dto: LoginDTO): Promise<AuthResponseDTO>;
    registerUser(registration: UserRegistrationDto): Promise<AuthResponseDTO>;
    v2RegisterUser(userId: string): Promise<AuthResponseDTO>;
    registerSocialUser(registration: UserRegistrationDto): Promise<AuthResponseDTO>;
}
