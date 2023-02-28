import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IDataServices } from '@ub-kart/core';
import { CassandraModule } from 'nestjs-cassandra';
import { CassandraDataServices } from './cassandra-data-services';
import { BuyerOrderRelationModel, DiscountLogModel, OrderModel, ProductModel, SellerProductRelationModel, UserModel } from './model';
import { CartModel } from './model/cart-model';

@Module({
  imports: [
    CassandraModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        clientOptions: {
        //   contactPoints: [await configService.get('CASSANDRA_CONTACT_POINTS')],
          contactPoints: ['localhost'],
          localDataCenter: 'datacenter1',
          keyspace: 'ubkart',
          protocolOptions: {
            port: 9042,
          },
          credentials: {
            username: 'cassandra',
            password: '',
          },
        },
        ormOptions: {
          defaultReplicationStrategy: {
            class: 'SimpleStrategy',
            replication_factor: 1,
          },
          migration: 'alter',
        },
      }),
      inject: [ConfigService],
    }),
    CassandraModule.forFeature([
        BuyerOrderRelationModel,
        SellerProductRelationModel,
        ProductModel,
        UserModel,
        OrderModel,
        CartModel,
        DiscountLogModel
    ]),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: CassandraDataServices,
    },
  ],
  exports: [IDataServices],
})
export class CassandraDataServicesModule {}