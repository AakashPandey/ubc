import { Column, CreateDateColumn, Entity } from "nestjs-cassandra";

@Entity({
    keyspace: 'ubkart',
    table_name: 'discount_log',
    key: ['code', 'created_at'],
    clustering_order: {
        created_at: 'desc'
    }
})

export class DiscountLogModel {
    @Column({type: 'uuid'})
    code: any;

    @Column({type: 'uuid'})
    user_id: any;

    @Column({type: 'float'})
    discount: number;

    @CreateDateColumn()
    created_at: Date;
}