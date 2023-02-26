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
    products: object;
    total: number;
    voucher_code?: string;
    status: OrderStatus;
    created_at: Date;
    updated_at: Date;
}
