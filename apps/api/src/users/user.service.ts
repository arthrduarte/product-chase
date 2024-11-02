import { Model } from 'mongoose';
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    findOne(username: string) {
        throw new Error('Method not implemented.');
    }
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findByUsername(username: string): Promise<User | null> {
        return this.userModel.findOne({ username: username }).exec();
    }

    async create(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        if (!newUser.username || !newUser.password) throw new BadRequestException('Username and password are required');

        const existingUser = await this.userModel.findOne({ username: newUser.username }).exec();
        if (existingUser) throw new ConflictException('User already exists');

        newUser.password = await bcrypt.hash(newUser.password, 10);

        return newUser.save();
    }
}
