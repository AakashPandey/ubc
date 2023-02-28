import { OrderStatus } from "@ub-kart/core";
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "nestjs-cassandra";

@Entity({
    keyspace: 'ubkart',
    table_name: 'orders',
    key: ['id']
})

export class OrderModel {
    @Column({type: 'uuid'})
    id: any;

    @Column({type: 'uuid'})
    user_id: any;

    @Column({type: 'frozen', typeDef: '<set<map<uuid, int>>>'})
    products: Array<Map<any, number>>;

    @Column({type: 'float'})
    total: number;

    @Column({type: 'float'})
    discount: number;

    @Column({type: 'text'})
    voucher_code: string;

    @Column({type: 'text'})
    status: OrderStatus;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}