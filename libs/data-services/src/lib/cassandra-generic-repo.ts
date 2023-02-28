import { FindQuery, Repository } from 'nestjs-cassandra';
import { lastValueFrom } from 'rxjs';

import { isUUID } from 'class-validator';
import { IGenericRepository } from '@ub-kart/core';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Uuid = require('cassandra-driver').types.Uuid;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Long = require('cassandra-driver').types.Long;

export class CassandraGenericRepository<T>
  implements IGenericRepository<T>
{
  private _repo: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repo = repository;
  }

  private parseUUID(obj: any) {
    for (const key in obj) {
      if (isUUID(obj[key])) {
        obj[key] = Uuid.fromString(obj[key]);
      }
    }
    return obj;
  }

  async get(keyname: any, keyval: any): Promise<T> {
    const query = {};
    query[keyname] = keyval;
    return await lastValueFrom(this._repo.findOne(query));
  }

  async delete(query) {
    for (const key in query) {
      if (isUUID(query[key])) {
        query[key] = Uuid.fromString(query[key]);
      }
    }
    return await lastValueFrom(this._repo.delete(query));
  }

  async search(query: any, groupID: any): Promise<T[]> {
    return await lastValueFrom(
      this._repo.find(
        <FindQuery<T>>(<unknown>{
          receiver: groupID,
          content: {
            $like: query,
          },
        }),
      )
    );
  }

  async addToSet(query: any, entry: any): Promise<T> {
    try {
      return await lastValueFrom(
        this._repo.update(<FindQuery<T>>(<unknown>{ query }), entry)
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async addToSetN(keyval: any, entry: any, keyz: any): Promise<T> {
    try {
      const obj = {};
      obj[keyz] = keyval;
      return await lastValueFrom(this._repo.update(obj, entry));
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async addToMap(query: any, entry: any): Promise<T> {
    try {
      return await lastValueFrom(this._repo.update(query, entry));
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async create(item: T): Promise<T> {
    return await lastValueFrom(this._repo.save(item));
  }

  async createTTL(item: T, s: any): Promise<T> {
    return await lastValueFrom(
      this._repo.save(item, {
        ttl: s,
      })
    );
  }

  async update(query: object, item: Partial<T>, conditions?: Partial<T>) {
    for (const key in query) {
      if (isUUID(query[key])) {
        query[key] = Uuid.fromString(query[key]);
      } else if (Array.isArray(query[key])) {
        query[key] = { $in: query[key] };
      } else if (typeof query[key] == 'bigint') {
        query[key] = Long.fromString(query[key].toString());
      }
    }
    for (const key in item) {
      if (isUUID(item[key])) {
        item[key] = Uuid.fromString(item[key]);
      } else if (typeof item[key] == 'bigint') {
        item[key] = Long.fromString(item[key].toString());
      }
    }
    return await lastValueFrom(
      this._repo.update(<FindQuery<T>>(<unknown>query), item, { conditions })
    );
  }

  async getAllByQuery(query: object): Promise<T[]>;
  async getAllByQuery(query: object, only: string[]): Promise<T[]>;
  async getAllByQuery(query: object, only: string[] = null) {
    for (const key in query) {
      if (isUUID(query[key])) {
        query[key] = Uuid.fromString(query[key]);
      } else if (Array.isArray(query[key])) {
        for (const item in query[key]) {
          if (typeof query[key][item] == 'bigint') {
            query[key][item] = Long.fromString(query[key][item].toString());
          }
        }
        query[key] = { $in: query[key] };
      } else if (typeof query[key] == 'bigint') {
        query[key] = Long.fromString(query[key].toString());
      }
    }
    if (!only) {
      return await lastValueFrom(
        this._repo.find(<FindQuery<T>>(<unknown>{ ...query }))
      );
    } else {
      return await lastValueFrom(
        this._repo.find(<FindQuery<T>>(<unknown>{ ...query }), {
          select: only,
        })
      );
    }
  }

  async getByQuery(query: object): Promise<T>;
  async getByQuery(query: object, only: string[]): Promise<T>;
  async getByQuery(query: object, only: string[] = null) {
    for (const key in query) {
      if (isUUID(query[key])) {
        query[key] = Uuid.fromString(query[key]);
      } else if (typeof query[key] == 'bigint') {
        query[key] = Long.fromString(query[key].toString());
      } else if (Array.isArray(query[key])) {
        query[key] = { $in: query[key] };
      }
    }
    if (!only) {
      return await lastValueFrom(
        this._repo.findOne(<FindQuery<T>>(<unknown>{ ...query }))
      );
    } else {
      return await lastValueFrom(
        this._repo.findOne(<FindQuery<T>>(<unknown>{ ...query }), {
          select: only,
        })
      );
    }
  }

  batchAction(items: { item: T; action: 'create' | 'delete' }[]): Promise<any> {
    const queries = items.map(({ item, action }) => {
      for (const key in item) {
        if (isUUID(item[key])) {
          item[key] = Uuid.fromString(item[key]);
        } else if (typeof item[key] == 'bigint') {
          item[key] = Long.fromString(item[key].toString());
        }
      }
      switch (action) {
        case 'create':
          return this._repo.getReturnQueryBuilder().save(item);
        case 'delete':
          return this._repo.getReturnQueryBuilder().delete(item);
      }
    });
    return this._repo.doBatch(queries);
  }

  runCustomQuery(query: string, params: any[]) {
    return this._repo.doBatch([{ query, params }]);
  }
}