import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async login(username: string, password: string): Promise<{ access_token: string }> {
        const user = await this.userService.findByUsername(username);
        if (user && await bcrypt.compare(password, user.password)) {
            const payload = { username: user.username };
            return { access_token: this.jwtService.sign(payload) }
        } else {
            throw new UnauthorizedException('Invalid credentials');
        }
    }
}
