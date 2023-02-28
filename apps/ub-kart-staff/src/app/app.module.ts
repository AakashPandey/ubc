import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StaffProductsController } from './controllers/staff-products.controller';
import { StaffProductsUseCasesModule } from './use-cases/staff-products-usecases.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),
    StaffProductsUseCasesModule
  ],
  controllers: [AppController, StaffProductsController],
  providers: [AppService],
})
export class AppModule {}
