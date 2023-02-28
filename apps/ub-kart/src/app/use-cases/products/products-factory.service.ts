import { Injectable } from "@nestjs/common";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Uuid = require('cassandra-driver').types.Uuid;

@Injectable()
export class ProductsFactoryService {
    parseId(id: string) {
        return Uuid.fromString(id);
    }
}