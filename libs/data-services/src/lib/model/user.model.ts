import { UserRole, Voucher } from "@ub-kart/core";
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "nestjs-cassandra";

@Entity({
    keyspace: 'ubkart',
    table_name: 'users',
    key: ['email'],
    
})

export class UserModel {
    @Column({type: 'uuid'})
    id: any;

    @Column({type: 'text'})
    email: string;

    @Column({type: 'text'})
    full_name: string;

    @Column({type: 'text'})
    password: string;

    @Column({type: 'map', typeDef: '<text, text>'})
    voucher: Voucher;

    @Column({type: 'text'})
    user_role: UserRole;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}