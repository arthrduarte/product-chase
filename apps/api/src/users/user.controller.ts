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
    findById(@Param('id') id: string): Promise<User | null> {
        return this.userService.findById(id);
    }

    @Post()
    create(@Body() user: User): Promise<User> {
        return this.userService.create(user);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() userData: Partial<User>): Promise<User | null> {
        return this.userService.update(id, userData);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<User | null> {
        return this.userService.delete(id);
    }
}
