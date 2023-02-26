import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { CreateUserDto } from "@ub-kart/core";
import { UsersUseCases } from "../use-cases/users/users.usecases";

@Controller('users')
export class UsersController {
    constructor(private usersUseCases: UsersUseCases) {}

    @Post()
    async create(@Req() req, @Body() createUserDto: CreateUserDto) {
        const user = await this.usersUseCases.create(
            req.user,
            createUserDto
        );

        return user;
    }

    @Get(':email')
    async getByEmail(@Req() req, @Param('email') email: string){
        const user = await this.usersUseCases.getByEmail(email);
        return user;
    }


}