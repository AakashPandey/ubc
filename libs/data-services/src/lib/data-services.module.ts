import { Module } from '@nestjs/common';
import { IDataServices } from '@ub-kart/core';
import { DataServices } from './data-services';

@Module({
  controllers: [],
  providers: [
    {
      provide: IDataServices,
      useClass: DataServices
    }
  ],
  exports: [IDataServices],
})
export class DataServicesModule {}
