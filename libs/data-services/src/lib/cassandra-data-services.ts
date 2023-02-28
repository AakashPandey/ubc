import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IDataServices } from '@ub-kart/core';
import { InjectRepository, Repository } from 'nestjs-cassandra';
import { CassandraGenericRepository } from './cassandra-generic-repo';
import { BuyerOrderRelationModel, DiscountLogModel, OrderModel, ProductModel, SellerProductRelationModel, UserModel } from './model';
import { CartModel } from './model/cart-model';

@Injectable()
export class CassandraDataServices
  implements IDataServices, OnApplicationBootstrap
{
    users: CassandraGenericRepository<UserModel>;
    orders: CassandraGenericRepository<OrderModel>;
    products: CassandraGenericRepository<ProductModel>;
    sellerProductRelations: CassandraGenericRepository<SellerProductRelationModel>;
    buyerOrderRelations: CassandraGenericRepository<BuyerOrderRelationModel>;
    carts: CassandraGenericRepository<CartModel>;
    vouchers: CassandraGenericRepository<DiscountLogModel>;

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

    @InjectRepository(CartModel)
    private readonly cartRepository: Repository<CartModel>,

    @InjectRepository(DiscountLogModel)
    private readonly voucherRepository: Repository<DiscountLogModel>,
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
    this.carts = new CassandraGenericRepository(
      this.cartRepository
    );

    this.vouchers = new CassandraGenericRepository(
      this.voucherRepository
    );
  }
}