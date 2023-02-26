import { Voucher } from './voucher.entity';

export enum UserRole {
    ADMIN = 'ADMIN',
    BUYER = 'BUYER',
    SELLER = 'SELLER'
}

export class User {
    id: any;
    email: string;
    full_name: string;
    password: string;
    user_role: UserRole;
    cart: object;
    voucher?: Voucher;
    created_at: Date;
    updated_at: Date;
}