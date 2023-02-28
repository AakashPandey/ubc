import { Injectable } from "@nestjs/common";
import { IDataServices } from "@ub-kart/core";
import { ProductsFactoryService } from "./products-factory.service";


@Injectable()
export class ProductsUseCases {
    constructor(
        private productsFactoryService: ProductsFactoryService,
        private dataService: IDataServices,
    ) {}

    async getAllProducts() {
        const allProducts = await this.dataService.products.getAllByQuery({});
        return allProducts;
    }
}