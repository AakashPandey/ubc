import { Cart } from './cart.entity';
import { Voucher } from './voucher.entity';

export enum OrderStatus {
    PLACED = 'PLACED',
    PROCESSING = 'PROCESSING',
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED',
    RETURNED = 'RETURNED'
}

export class Order {
    id: string;
    user_id: string;
    products: Array<Map<any, number>>;
    total: number;
    discount: number;
    voucher_code?: string;
    status: OrderStatus;
    created_at: Date;
    updated_at: Date;
}
