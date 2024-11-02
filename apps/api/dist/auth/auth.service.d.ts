import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    login(username: string, password: string): Promise<{
        access_token: string;
    }>;
}
