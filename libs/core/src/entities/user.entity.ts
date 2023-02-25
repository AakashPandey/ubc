import { Cart } from './cart.entity';
import { Voucher } from './voucher.entity';

export enum UserRole {
    ADMIN,
    BUYER,
    SELLER
}

export class User {
    id: string;
    email: string;
    full_name: string;
    password: string;
    user_role: UserRole;
    cart?: Cart[];
    voucher?: Voucher;
    created_at: Date;
    updated_at: Date;
}