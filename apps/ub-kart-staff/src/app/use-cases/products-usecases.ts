import { Injectable } from "@nestjs/common";
import { CreateProductDto, IDataServices, Product, SellerProductRelation, User } from "@ub-kart/core";
import { ProductsFactoryService } from "./products-factory.service";


@Injectable()
export class ProductsUseCases {
    constructor(
        private productsFactoryService: ProductsFactoryService,
        private dataService: IDataServices,
    ) {}

    async create(user: User, createProductDto: CreateProductDto) {
        const newProduct = this.productsFactoryService.createNewProduct(
            user, createProductDto
        );
         // to;do - add verify user role admin/seller   
        let createdProduct: Product;
        let createdSellerProductRelation: SellerProductRelation
        try {
            createdProduct = await this.dataService.products.create(newProduct);
            const newRelation = this.productsFactoryService.createNewSellerProductRelation(newProduct.seller, createdProduct.sku);
            createdSellerProductRelation = await this.dataService.sellerProductRelations.create(newRelation);
            return createdProduct;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }

    async getBySeller(seller_id: string) {
        const seller = this.productsFactoryService.parseId(seller_id);
        const productIds = this.dataService.sellerProductRelations.getAllByQuery({seller: seller});
        return productIds;
    }
}