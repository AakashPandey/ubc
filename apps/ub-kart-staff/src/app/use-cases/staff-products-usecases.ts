import { Injectable } from "@nestjs/common";
import { CreateProductDto, IDataServices, Product, SellerProductRelation, User } from "@ub-kart/core";
import { StaffProductsFactoryService } from "./staff-products-factory.service";


@Injectable()
export class StaffProductsUseCases {
    constructor(
        private staffProductsFactoryService: StaffProductsFactoryService,
        private dataService: IDataServices,
    ) {}

    async create(user: User, createProductDto: CreateProductDto) {
        const newProduct = this.staffProductsFactoryService.createNewProduct(
            user, createProductDto
        );
         // to;do - add verify user role admin/seller   
        let createdProduct: Product;
        let createdSellerProductRelation: SellerProductRelation
        try {
            createdProduct = await this.dataService.products.create(newProduct);
            const newRelation = this.staffProductsFactoryService.createNewSellerProductRelation(newProduct.seller, createdProduct.sku);
            createdSellerProductRelation = await this.dataService.sellerProductRelations.create(newRelation);
            return createdProduct;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }

    async getBySeller(seller_id: string) {
        const seller = this.staffProductsFactoryService.parseId(seller_id);
        const res = await this.dataService.sellerProductRelations.getAllByQuery({seller: seller});
        const productIds = res.map(entry => entry.product);
        return productIds;
    }
}