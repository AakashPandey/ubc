import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products.controller';
import { UsersController } from './controllers/users.controllers';
import { ProductsUseCasesModule } from './use-cases/products/products-usecases.module';
import { UsersUseCasesModule } from './use-cases/users/users.use-cases.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),
    UsersUseCasesModule,
    ProductsUseCasesModule
  ],
  controllers: [AppController, UsersController, ProductsController],
  providers: [AppService],
})
export class AppModule {}
