import {IsNotEmpty, IsOptional, IsString} from "class-validator"
import { Cart } from "../../entities/cart.entity";

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
