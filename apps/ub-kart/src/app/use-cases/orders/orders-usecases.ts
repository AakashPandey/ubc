import { Injectable } from "@nestjs/common";
import { IDataServices, Order, OrderStatus, OrderStatusDto, Voucher } from "@ub-kart/core";
import { UsersUseCases } from "../users/users.usecases";
import { OrdersFactoryService } from "./orders-factory.service";

@Injectable()
export class OrdersUseCases {
  constructor(
      private ordersFactoryService: OrdersFactoryService,
      private dataService: IDataServices,
      private userUseCases: UsersUseCases
  ) {}

  async updateOrderStatus(orderId, newStatus: OrderStatus){
    await this.dataService.orders.update({id: orderId}, {status: newStatus});
  }

  async generateCoupon(email: string){
    const user = await this.userUseCases.getByEmail(email);
    // If user voucher does not exist then
    if(user.voucher==null || user.voucher.voucher_code!==''){
      const orders = await this.getOrders(email);
      const orderCount = orders['count'];
      if(orderCount!=null) {
        // on every 3rd order
        if(orderCount!==0 && orderCount%3===0) {
          const voucher = this.ordersFactoryService.createVoucher('10');
          await this.dataService.users.update({email: email}, {voucher: voucher});
        }
      }
    }
  }

  async updateProductsInventory(products: Array<Map<any, number>>) {
    for (const entry of products) {
      const currentInventory = await this.dataService.products.getByQuery({sku: Object.keys(entry)[0]});
      const newInventory = currentInventory.inventory - Object.values(entry)[0];
      if(newInventory>=0) {
        await this.dataService.products.update({sku: currentInventory.sku}, {inventory: newInventory})
      } else {
        return false;
      }
    }
    return true;
  }

  async placeOrder(email: string, voucherCode) {
    const user = await this.userUseCases.getByEmail(email)
    const cart = await this.userUseCases.getCart(email);
    if(cart['total']===0){
      return { success: false, message: "add products to cart" };
    }
    const order = this.ordersFactoryService.createOrder(user.id, cart);

    if(voucherCode!=null || voucherCode!==''){
      if(user.voucher!=null){
        if(user.voucher.voucher_code!=''){
          if(voucherCode === user.voucher.voucher_code){
            const discountPercent = parseInt(user.voucher.discount);
            const discount = discountPercent / 100 * order.total;
            order.voucher_code = voucherCode;
            order.total -= discount;
            order.discount = discount;

            const voucher = new Voucher();
            const log = this.ordersFactoryService.createDiscountLog(voucherCode, user.id, discount);
            await this.dataService.vouchers.create(log);
            await this.dataService.users.update({email: email}, {voucher: voucher});
          }
        }
      }
    }

    const updateInventory = await this.updateProductsInventory(order.products);
    const buyerOrderRelation = this.ordersFactoryService.createBuyerOrderRelation(user.id, order.id);

    let newOrder: Order;
    if(updateInventory){
      newOrder = await this.dataService.orders.create(order);
      await this.dataService.buyerOrderRelations.create(buyerOrderRelation);
      if(newOrder!=null){
        if(newOrder.status==OrderStatus.PLACED) {
          await this.userUseCases.clearCart(email);
          setTimeout(()=>{
            this.updateOrderStatus(newOrder.id, OrderStatus.PROCESSING);
            this.generateCoupon(email);
          }, 3000);
        }
      }
      return newOrder;
    } else {
      return { success: false };
    }
  }

  async getOrders(email: string){
    const user = await this.userUseCases.getByEmail(email);
    const orderRelation = await this.dataService.buyerOrderRelations.getAllByQuery({buyer: user.id});
    const response = {};
    response['orders'] = [];
    response['count'] = 0;
    for (const entry of orderRelation) {
      const order = await this.dataService.orders.getByQuery({id: entry.order});
      response['orders'].push(order)
      response['count'] += 1;
    }
    return response;
  }

  async getAvailableVoucher(email: string){
    const user = await this.userUseCases.getByEmail(email);
    const voucher = user.voucher;
    return voucher;
  }

  async updateStatus(email: string, statusDto: OrderStatusDto){
    await this.updateOrderStatus(statusDto.order_id, statusDto.status);
    return;
  }
}