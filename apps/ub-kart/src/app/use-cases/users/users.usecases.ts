import { Injectable } from "@nestjs/common";
import { CartDto, CreateUserDto, IDataServices, User } from "@ub-kart/core";
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

    async addToCart(email: string,  cartDto: CartDto) {
        try {
            let cart = this.usersFactoryService.addToCart(email, cartDto);
            cart = await this.dataService.carts.create(cart);
            return cart;
        } catch(e){
            console.log(e);
            throw e;
        }       
    }

    async getCart(email: string) {
        try {
            const cart = await this.dataService.carts.getAllByQuery({email:email});
            const response = {};
            response['items'] = [];
            let total = 0;
            if(cart!=null) {
                for (const item of cart) {
                    const product = await this.dataService.products.getByQuery({sku:item.sku});
                    total += product.price * item.quantity;
                    item.price = product.price;
                    item.product_name = product.name;
                    response['items'].push(item);
                }
                response['total'] = total;
            }
            return response;
        } catch(e){
            console.log(e);
            throw e;
        }       
    }

    async clearCart(email: string) {
        try {
            await this.dataService.carts.delete({email: email});
            return { success: true }
        } catch(e){
            console.log(e);
            throw e;
        }       
    }
}