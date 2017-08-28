import { Callback } from './index';

export interface IReadRepository<T> {
    retrieve: (cb?: Callback<T>) => Promise<T[]>;
    findById: (id: string, cb?: Callback<T>) => Promise<T>;
    findOne: (cond: any, fields: any, options: any, cb?: Callback<T>) => Promise<T>;
    find: (cond: any, fields: any, options: any, sortOptions?: any, cb?: Callback<T>) => Promise<T[]>;
    count: (cond?: any) => Promise<number>;
}