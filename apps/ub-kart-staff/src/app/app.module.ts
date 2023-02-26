import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products.controller';
import { ProductsUseCasesModule } from './use-cases/products-usecases.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),
    ProductsUseCasesModule
  ],
  controllers: [AppController, ProductsController],
  providers: [AppService],
})
export class AppModule {}
