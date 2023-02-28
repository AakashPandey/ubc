import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "nestjs-cassandra";

@Entity({
    keyspace: 'ubkart',
    table_name: 'carts',
    key: ['email', 'sku'],
})

export class CartModel {
    @Column({type: 'text'})
    email: string;

    @Column({type: 'uuid'})
    sku: any;
    
    @Column({type: 'text'})
    product_name: string;

    @Column({type: 'float'})
    price: number;

    @Column({type: 'int'})
    quantity: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}