import { Injectable } from "@nestjs/common";
import { Cart, CartDto, CreateUserDto, User, UserRole } from "@ub-kart/core";
import { randomUUID } from "crypto";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Uuid = require('cassandra-driver').types.Uuid;

@Injectable()
export class UsersFactoryService {
    createNewUser(user: User, createUserDto: CreateUserDto) {
        const newUser = new User();
        newUser.id =  Uuid.fromString(randomUUID());
        newUser.email = createUserDto.email;
        newUser.full_name = createUserDto.full_name;
        newUser.user_role = UserRole.BUYER;
        return newUser;
    }

    addToCart(email: string, cartDto: CartDto) {
        const cart = new Cart();
        cart.email = email;
        cart.sku = Uuid.fromString(cartDto.sku);
        cart.quantity = cartDto.quantity;
        return cart;
    }
}