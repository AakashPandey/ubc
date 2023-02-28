import { Module } from "@nestjs/common";
import { DataServicesModule } from "../../services/data-services.module";
import { UsersFactoryService } from "../users/users-factory.service";
import { UsersUseCases } from "../users/users.usecases";
import { OrdersFactoryService } from "./orders-factory.service";
import { OrdersUseCases } from "./orders-usecases";

@Module({
    imports: [DataServicesModule],
    providers:[OrdersUseCases, UsersUseCases, UsersFactoryService, OrdersFactoryService],
    exports: [OrdersUseCases]
})

export class OrdersUseCasesModule {}