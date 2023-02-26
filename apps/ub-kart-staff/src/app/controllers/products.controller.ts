import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { CreateProductDto } from "@ub-kart/core";
import { ProductsUseCases } from "../use-cases/products-usecases";

@Controller('products')
export class ProductsController {
    constructor(private productsUseCases: ProductsUseCases) {}
    @Post()
    async create(@Req() req, @Body() createProductDto: CreateProductDto) {
      
        const product = await this.productsUseCases.create(
            req.user,
            createProductDto
        );

        return product;
    }

    @Get(':seller_id')
    async getAllBySeller(@Req() req, @Param('seller_id') seller_id: string) {
        const products = await this.productsUseCases.getBySeller(seller_id);
        return products;
    }

}