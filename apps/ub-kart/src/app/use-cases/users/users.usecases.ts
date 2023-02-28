import { Injectable } from "@nestjs/common";
import { CartDto, CartItemCountDto, CreateUserDto, IDataServices, User } from "@ub-kart/core";
import { UsersFactoryService } from "./users-factory.service";

@Injectable()
export class UsersUseCases {
    constructor(
        private usersFactoryService: UsersFactoryService,
        private dataService: IDataServices,
    ) {}

    async create(user: User, createUserDto: CreateUserDto ) {
        const newUser = this.usersFactoryService.createNewUser(
            user, createUserDto
        );
        let createdUser: User;
        try {
            createdUser = await this.dataService.users.create(newUser);   
            return createdUser;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }

    async getByEmail(email: string) {
        let user: User;
        try {
            user = await this.dataService.users.get('email', email);
            delete(user.password);
            return user;
        } catch(e){
            console.log(e);
            throw e;
        }
    }

    async setItemCount(email: string,  cartItemCountDto: CartItemCountDto) {
        let responseUser: User;
        try {
            const user = await this.dataService.users.get('email', email);
            const userNewCart = this.usersFactoryService.updateCart(user, CartItemCountDto);
            

            return responseUser;
        } catch(e){
            console.log(e);
            throw e;
        }       
    }
}