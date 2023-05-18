import { forgotDTO } from 'src/auth/auth.dto';
import { AppointmentService } from '../appointment/appointment.service';
import { StudioService } from '../studio/studio.service';
import { SessionListDto } from './SessionListDto';
import { User } from './user.entity';
import { UserService } from './user.service';
export declare class UserController {
    private readonly appointmentService;
    private readonly studioService;
    private userService;
    private log;
    constructor(appointmentService: AppointmentService, studioService: StudioService, userService: UserService);
    getUser(userId: string): Promise<User>;
    checkDuplication(email: string): Promise<{
        result: string;
    }>;
    getAllUser(): Promise<User[]>;
    deleteUser(id: string): Promise<any>;
    updateUser(userInfo: User): Promise<User>;
    getUserSessions(userId: any): Promise<SessionListDto>;
    forgot(dto: forgotDTO): Promise<any>;
    sendPushNotification(requestBody: any): Promise<any>;
}
