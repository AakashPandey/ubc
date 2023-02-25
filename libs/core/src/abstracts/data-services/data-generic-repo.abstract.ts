export abstract class IGenericRepository<T> {
    abstract getById(id: string): Promise<T>;
    abstract getAll(): [];
    abstract create(item: T): Promise<T>;
    abstract update(item: T): Promise<T>;
}