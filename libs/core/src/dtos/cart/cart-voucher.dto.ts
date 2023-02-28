import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class VoucherDto {
  @IsString()
  @IsOptional()
  coupon: string;
}