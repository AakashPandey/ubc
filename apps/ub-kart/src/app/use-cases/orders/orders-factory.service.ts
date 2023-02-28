import { Injectable } from "@nestjs/common";
import { BuyerOrderRelation, DiscountLog, Order, OrderStatus, Voucher } from "@ub-kart/core";
import { randomUUID } from "crypto";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Uuid = require('cassandra-driver').types.Uuid;

@Injectable()
export class OrdersFactoryService {
    createOrder(userId: any, cart) {
      const order = new Order();
      order.id = Uuid.fromString(randomUUID());
      order.user_id = userId;
      order.status = OrderStatus.PLACED;
      order.total = cart['total']
      const products = [];
      cart['items'].forEach(item => {
        const entry = {};
        entry[item.sku] = item.quantity;
        products.push(entry);
      });
      order.products = products;
      return order;
    }

    createBuyerOrderRelation(buyerId, orderId) {
      const relation = new BuyerOrderRelation();
      relation.buyer = buyerId;
      relation.order = orderId;
      return relation;
    }

    createVoucher(discount: string){
      const voucher = new Voucher();
      voucher.discount = discount;
      voucher.voucher_code = randomUUID().toString();
      return voucher;
    }

    createDiscountLog(discountCode: string, userId: any, discount: number){
      const log = new DiscountLog();
      log.code = Uuid.fromString(discountCode);
      log.user_id = userId;
      log.discount = discount
      return log;
    }
}