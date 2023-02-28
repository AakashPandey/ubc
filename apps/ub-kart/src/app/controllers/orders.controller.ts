import { Body, Controller, Get, Param, Patch, Post, Req } from "@nestjs/common";
import { OrderStatusDto, VoucherDto } from "@ub-kart/core";
import { OrdersUseCases } from "../use-cases/orders/orders-usecases";

@Controller('orders')
export class OrdersController {
  constructor(private ordersUseCases: OrdersUseCases) {}
  @Post(':email')
  async placeOrder(@Req() req, @Param('email') email: string, @Body() voucherDto: VoucherDto) {
      const order = await this.ordersUseCases.placeOrder(email, voucherDto.coupon);
      return order;
  }

  @Get(':email')
  async getOrders(@Req() req, @Param('email') email: string) {
      const orders = await this.ordersUseCases.getOrders(email);
      return orders;
  }

  @Patch(':email')
  async updateStatus(@Req() req, @Param('email') email: string, @Body() statusDto: OrderStatusDto ) {
    await this.ordersUseCases.updateStatus(email, statusDto);
    return {success: true}
  }

  @Get(':email/voucher')
  async getVoucher(@Req() req, @Param('email') email: string) {
      const voucher = await this.ordersUseCases.getAvailableVoucher(email);
      return voucher;
  }



}