import { User, Order, Product } from "../../entities";
import { IGenericRepository } from "./data-generic-repo.abstract";

export abstract class IDataServices {
    abstract users: IGenericRepository<User>;
    abstract orders: IGenericRepository<Order>;
    abstract products: IGenericRepository<Product>;
}