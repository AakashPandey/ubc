import { IsNotEmpty, IsString } from "class-validator";
import { OrderStatus } from "../../entities";

export class OrderStatusDto {
  @IsString()
  @IsNotEmpty()
  order_id: string;

  @IsString()
  @IsNotEmpty()
  status: OrderStatus;
}