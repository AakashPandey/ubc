import { Column, Entity } from "nestjs-cassandra";

@Entity({
    keyspace: 'ubkart',
    table_name: 'buyer_order_relation',
    key: ['buyer', 'order']
    
})

export class BuyerOrderRelationModel {
    @Column({type: 'uuid'})
    buyer: any;

    @Column({type: 'uuid'})
    order: any;
}