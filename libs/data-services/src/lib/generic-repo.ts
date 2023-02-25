import { IGenericRepository } from "@ub-kart/core";

export class GenericRepoImpl<T> implements IGenericRepository<T> {

    repoItems = new Map();

    getById(id: any): Promise<T> {
        return this.repoItems.get(id);
    }

    getAll(): [] {
        return <any>this.repoItems.entries;
    }

    create(item: T): Promise<T> {
        this.repoItems.set(item['id'], item);
        return;
    }
    
    update(item: T): Promise<T> {
        this.repoItems.set(item['id'], item);
        return;
    }   
}