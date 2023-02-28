import {IsArray, IsEmail, IsInt, IsNotEmpty, IsObject, IsString, IsStrongPassword} from 'class-validator';

export class CartDto {
    @IsString()
    @IsNotEmpty()
    sku: string;

    @IsInt()
    @IsNotEmpty()
    quantity: number;
}