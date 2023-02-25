import {IsNotEmpty} from "class-validator"

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    user_id: string,

    @IsString()
    @IsNotEmpty()
    products: array,

    @IsString()
    @IsOptional()
    voucher_code: string,
}
