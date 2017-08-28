import { Callback } from './index';

export interface IWriteRepository<T> {
    create: (item: any, cb?: Callback<T>) => Promise<T>;
    save: (item: T, cb?: Callback<T>) => Promise<T>;
    upsert: (cond: any, item: T, cb?: Callback<T>) => Promise<T>;
    delete: (_id: string, cb?: Callback<T>) => Promise<boolean>;
    deleteAll: (cb?: Callback<T>) => Promise<boolean>;
    deleteAllItems: (items: T[], cb?: Callback<T>) => Promise<boolean>;
}