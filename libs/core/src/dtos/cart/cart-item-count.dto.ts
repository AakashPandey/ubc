import {IsArray, IsEmail, IsInt, IsNotEmpty, IsObject, IsString, IsStrongPassword} from 'class-validator';

export class CartItemCountDto {
    @IsString()
    @IsNotEmpty()
    sku: string;

    @IsInt()
    @IsNotEmpty()
    quantity: number;
}