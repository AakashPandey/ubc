import { Injectable } from "@nestjs/common";
import { IDataServices, IGenericRepository, Order, Product, User } from "@ub-kart/core";
import { GenericRepoImpl } from "./generic-repo";

@Injectable()

export class DataServices implements IDataServices{
    users: IGenericRepository<User>;
    orders: IGenericRepository<Order>;
    products: IGenericRepository<Product>;
    
    // constructor (
    //     private readonly usersRepo: GenericRepoImpl<User>,
    //     private readonly ordersRepo: GenericRepoImpl<Order>,
    //     private readonly productsRepo: GenericRepoImpl<Product>,
    // ) {}

    onApplicationBootstrap() {
        this.users = new GenericRepoImpl();
        this.orders = new GenericRepoImpl();
        this.orders = new GenericRepoImpl();
    }
}