import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    findByUsername(@Param('id') id: string): Promise<User | null> {
        return this.userService.findByUsername(id);
    }

    @Post()
    create(@Body() user: User): Promise<User> {
        return this.userService.create(user);
    }
}
