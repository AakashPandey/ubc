import { OrderStatus, UserRole } from "@ub-kart/core";
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "nestjs-cassandra";

@Entity({
    keyspace: 'ubkart',
    table_name: 'products',
    key: ['sku', 'created_at'],
    clustering_order: {
        created_at: 'desc'
    }
})

export class ProductModel {
    @Column({type: 'uuid'})
    sku: any;

    @Column({type: 'uuid'})
    seller: any;

    @Column({type: 'text'})
    name: string;

    @Column({type: 'text'})
    description: string;

    @Column({type: 'float'})
    price: number;

    @Column({type: 'int'})
    inventory: number;

    @Column({type: 'text'})
    image: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}