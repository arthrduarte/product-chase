import { Model } from 'mongoose';
import { User } from './user.schema';
export declare class UserService {
    private userModel;
    findOne(username: string): void;
    constructor(userModel: Model<User>);
    findAll(): Promise<User[]>;
    findByUsername(username: string): Promise<User | null>;
    create(user: User): Promise<User>;
}
