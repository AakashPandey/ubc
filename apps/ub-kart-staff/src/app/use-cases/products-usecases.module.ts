import { Module } from "@nestjs/common";
import { CassandraDataServicesModule } from "@ub-kart/data-services";
import { ProductsFactoryService } from "./products-factory.service";
import { ProductsUseCases } from "./products-usecases";

@Module({
    imports: [CassandraDataServicesModule],
    providers:[ProductsUseCases, ProductsFactoryService],
    exports: [ProductsUseCases]
})

export class ProductsUseCasesModule {}