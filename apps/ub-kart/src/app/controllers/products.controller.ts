import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { ProductsUseCases } from "../use-cases/products/products-usecases";

@Controller('products')
export class ProductsController {
    constructor(private productsUseCases: ProductsUseCases) {}

    @Get()
    async getAllBySeller(@Req() req) {
        const products = await this.productsUseCases.getAllProducts();
        return products;
    }

}