import { Module } from "@nestjs/common";
import { CassandraDataServicesModule } from "@ub-kart/data-services";
import { DataServicesModule } from "../../services/data-services.module";
import { UsersFactoryService } from "./users-factory.service";
import { UsersUseCases } from "./users.usecases";

@Module({
    imports: [DataServicesModule],
    providers:[UsersUseCases, UsersFactoryService],
    exports: [UsersUseCases]
})

export class UsersUseCasesModule {}