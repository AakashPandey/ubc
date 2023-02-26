import { Cart } from "@ub-kart/core";
import {IsNotEmpty, IsOptional, IsString} from "class-validator"

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    user_id: string;

    @IsString()
    @IsNotEmpty()
    products: Array<Cart>;

    @IsString()
    @IsOptional()
    voucher_code: string;
}
