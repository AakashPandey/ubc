import { BuyerOrderRelation, Order, Product, SellerProductRelation, User } from "../../entities";
import { IGenericRepository } from "./generic-repo.abstract";

export abstract class IDataServices {
    abstract users: IGenericRepository<User>;
    abstract orders: IGenericRepository<Order>;
    abstract products: IGenericRepository<Product>;
    abstract sellerProductRelations: IGenericRepository<SellerProductRelation>;
    abstract buyerOrderRelations: IGenericRepository<BuyerOrderRelation>;
}