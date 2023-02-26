import { Module } from "@nestjs/common";
import { CassandraDataServicesModule } from "@ub-kart/data-services";

@Module({
    imports: [
        CassandraDataServicesModule
    ],
    exports: [
        CassandraDataServicesModule
    ]
})
export class DataServicesModule {}