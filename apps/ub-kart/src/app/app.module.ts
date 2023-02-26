import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './controllers/users.controllers';
import { UsersUseCasesModule } from './use-cases/users/users.use-cases.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),
    UsersUseCasesModule
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
