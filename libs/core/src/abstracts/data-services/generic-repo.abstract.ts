export abstract class IGenericRepository<T> {  
    abstract get(keyname: any, keyval: any): Promise<T>;
    
    abstract create(item: T): Promise<T>;
  
    abstract createTTL(item: T, s: any): Promise<T>;
  
    abstract update(
      query: object,
      item: Partial<T>,
      conditions?: Partial<T>
    ): Promise<T>;
  
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