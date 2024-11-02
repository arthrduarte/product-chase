import { UserService } from './user.service';
import { User } from './user.schema';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<User[]>;
    findByUsername(id: string): Promise<User | null>;
    create(user: User): Promise<User>;
}
