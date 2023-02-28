import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersController } from './controllers/orders.controller';
import { ProductsController } from './controllers/products.controller';
import { UsersController } from './controllers/users.controllers';
import { OrdersUseCases } from './use-cases/orders/orders-usecases';
import { OrdersUseCasesModule } from './use-cases/orders/orders-usecases.module';
import { ProductsUseCasesModule } from './use-cases/products/products-usecases.module';
import { UsersUseCasesModule } from './use-cases/users/users.use-cases.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),
    UsersUseCasesModule,
    ProductsUseCasesModule,
    OrdersUseCasesModule
  ],
  controllers: [AppController, UsersController, ProductsController, OrdersController],
  providers: [AppService],
})
export class AppModule {}
