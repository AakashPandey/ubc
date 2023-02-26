import { Column, Entity } from "nestjs-cassandra";

@Entity({
    keyspace: 'ubkart',
    table_name: 'seller_product_relation',
    key: ['seller', 'product']
})

export class SellerProductRelationModel {
    @Column({type: 'uuid'})
    seller: any;

    @Column({type: 'uuid'})
    product: any;
}