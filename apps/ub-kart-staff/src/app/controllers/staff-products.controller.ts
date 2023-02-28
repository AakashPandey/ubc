import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { CreateProductDto } from "@ub-kart/core";
import { StaffProductsUseCases } from "../use-cases/staff-products-usecases";

@Controller('staff-products')
export class StaffProductsController {
    constructor(private staffProductsUseCases: StaffProductsUseCases) {}
    @Post()
    async create(@Req() req, @Body() createProductDto: CreateProductDto) {
      
        const product = await this.staffProductsUseCases.create(
            req.user,
            createProductDto
        );

        return product;
    }

    @Get(':seller_id')
    async getAllBySeller(@Req() req, @Param('seller_id') seller_id: string) {
        const products = await this.staffProductsUseCases.getBySeller(seller_id);
        return products;
    }

}