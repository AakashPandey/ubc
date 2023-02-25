import { Cart } from './cart.entity';
import { Voucher } from './voucher.entity';

export enum OrderStatus {
    PLACED,
    PROCESSING,
    CONFIRMED,
    CANCELLED,
    RETURNED
}

export class Order {
    id: string;
    user_id: string;
    products: Cart[];
    total: number;
    voucher?: Voucher;
    status: OrderStatus;
    created_at: Date;
    updated_at: Date;
}
