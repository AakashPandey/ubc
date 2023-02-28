import { Injectable } from "@nestjs/common";
import { CreateProductDto, Product, SellerProductRelation, User } from "@ub-kart/core";
import { randomUUID } from "crypto";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Uuid = require('cassandra-driver').types.Uuid;

@Injectable()
export class StaffProductsFactoryService {
    createNewProduct(user: User, createProductDto: CreateProductDto) {
        const newProduct = new Product();
        newProduct.sku =  Uuid.fromString(randomUUID());
        newProduct.name = createProductDto.name;
        newProduct.image = createProductDto.image;
        newProduct.description = createProductDto.description;
        newProduct.price = createProductDto.price;
        newProduct.inventory = createProductDto.inventory;
        newProduct.seller = Uuid.fromString(createProductDto.seller_id);
        return newProduct;
    }
    createNewSellerProductRelation(sellerId: any, productId: any) {
        const newRelation = new SellerProductRelation();
        newRelation.seller = sellerId;
        newRelation.product = productId;
        return newRelation;
    }
    parseId(id: string) {
        return Uuid.fromString(id);
    }
}