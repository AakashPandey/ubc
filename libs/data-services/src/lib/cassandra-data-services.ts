import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IDataServices } from 'libs/core/src/abstracts/data-services/data-services.abstract';
import { BuyerOrderRelation, Order, Product, SellerProductRelation, User } from 'libs/core/src/entities';
import { InjectRepository, Repository } from 'nestjs-cassandra';
import { CassandraGenericRepository } from './cassandra-generic-repo';
import { BuyerOrderRelationModel, OrderModel, ProductModel, SellerProductRelationModel, UserModel } from './model';

@Injectable()
export class CassandraDataServices
  implements IDataServices, OnApplicationBootstrap
{
    users: CassandraGenericRepository<UserModel>;
    orders: CassandraGenericRepository<OrderModel>;
    products: CassandraGenericRepository<ProductModel>;
    sellerProductRelations: CassandraGenericRepository<SellerProductRelationModel>;
    buyerOrderRelations: CassandraGenericRepository<BuyerOrderRelationModel>;

  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,

    @InjectRepository(OrderModel)
    private readonly orderRepository: Repository<OrderModel>,

    @InjectRepository(ProductModel)
    private readonly productRepository: Repository<ProductModel>,

    @InjectRepository(SellerProductRelationModel)
    private readonly sellerProductRelationRepository: Repository<SellerProductRelationModel>,

    @InjectRepository(BuyerOrderRelationModel)
    private readonly buyerOrderRelationRepository: Repository<BuyerOrderRelationModel>,
  ) {}


  onApplicationBootstrap() {

    this.users = new CassandraGenericRepository(
      this.userRepository
    );
    this.orders = new CassandraGenericRepository(
      this.orderRepository
    );
    this.products = new CassandraGenericRepository(
      this.productRepository
    );
    this.sellerProductRelations = new CassandraGenericRepository(
      this.sellerProductRelationRepository
    );
    this.buyerOrderRelations = new CassandraGenericRepository(
      this.buyerOrderRelationRepository
    );

  }
}