import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req } from "@nestjs/common";
import { CartDto, CartItemCountDto, CreateUserDto } from "@ub-kart/core";
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

    @Get('cart/:email')
    async getCart(@Param('email') email: string) {
        const cart = await this.usersUseCases.getCart(email);
        return cart;
    }

    @Put('cart/:email')
    async addToCart(@Param('email') email: string, @Body() cartDto: CartDto) {
        const cart = await this.usersUseCases.addToCart(email, cartDto);
        return cart;
    }

    @Delete('cart/:email')
    async clearCart(@Param('email') email: string) {
        const cart = await this.usersUseCases.clearCart(email);
        return cart;
    }

    // @Patch('cart/:email')
    // async setItemCount(@Param('email') email: string, @Body() cartItemCountDto: CartItemCountDto) {
    //     const cart = await this.usersUseCases.setItemCount(email, cartItemCountDto);
    //     return cart;
    // }
    


}