import { Module } from "@nestjs/common";
import { CassandraDataServicesModule } from "@ub-kart/data-services";
import { StaffProductsFactoryService } from "./staff-products-factory.service";
import {StaffProductsUseCases } from "./staff-products-usecases";

@Module({
    imports: [CassandraDataServicesModule],
    providers:[StaffProductsUseCases, StaffProductsFactoryService],
    exports: [StaffProductsUseCases]
})

export class StaffProductsUseCasesModule {}