import {IsInt, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    // to;do remove after auth impl
    @IsString()
    @IsNotEmpty()
    seller_id: string;

    @IsString()
    @IsOptional()
    image: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsInt()
    @IsNotEmpty()
    inventory: number;
}
