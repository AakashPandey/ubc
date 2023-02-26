import { OrderStatus } from "@ub-kart/core";
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "nestjs-cassandra";

@Entity({
    keyspace: 'ubkart',
    table_name: 'orders',
    key: ['status', 'created_at'],
    clustering_order: {
        created_at: 'desc'
    }
})

export class OrderModel {
    @Column({type: 'uuid'})
    id: any;

    @Column({type: 'uuid'})
    user_id: any;

    @Column({type: 'map', typeDef: '<uuid, int>'})
    products: object;

    @Column({type: 'float'})
    total: number;

    @Column({type: 'text'})
    voucher_code: string;

    @Column({type: 'text'})
    status: OrderStatus;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}