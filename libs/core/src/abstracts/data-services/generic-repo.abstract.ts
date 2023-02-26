export abstract class IGenericRepository<T> {
    abstract getAll(): Promise<T[]>;
  
    abstract get(keyname: any, keyval: any): Promise<T>;
  
    abstract getById(id: any): Promise<T>;
  
    abstract create(item: T): Promise<T>;
  
    abstract createTTL(item: T, s: any): Promise<T>;
  
    abstract update(
      id: any,
      item: Partial<T>,
      conditions?: Partial<T>
    ): Promise<T>;
  
    abstract getLastN(
      id: any,
      count: number,
      after: any,
      before: any
    ): Promise<T[]>;
  
    abstract getQN(query: any, count: number): Promise<T[]>;
  
    abstract getQ(query: any): Promise<T>;
  
    abstract addToSet(query: any, entry: any): Promise<T>;
  
    abstract addToSetN(keyval: any, entry: any, keyz: any): Promise<T>;
  
    abstract addToMap(query: any, entry: any): Promise<T>;
  
    abstract search(query: any, groupID: any): Promise<T[]>;
  
    abstract delete(query: Partial<T>): Promise<T>;
  
    abstract getAllByQuery(query: object): Promise<T[]>;
    abstract getAllByQuery(query: object, only: string[]): Promise<T[]>;
  
    abstract getByQuery(query: object): Promise<T>;
    abstract getByQuery(query: object, only: string[]): Promise<T>;
  
    abstract batchAction(
      items: { item: Partial<T>; action: 'create' | 'delete' }[]
    ): Promise<any>;
  
    abstract runCustomQuery(query: string, params: any[]);
  }