import * as mongoose from 'mongoose';
import { Callback } from './interface/index';
import { Inject } from '../decorator/inject';
import { SchemasStore } from './schemas-store';
import { errorHandler } from './mongo-error-handler';

/*
import { IWriteRepository } from './interface/write';
import { IReadRepository } from './interface/read';
*/


export abstract class BaseRepository<T> /*implements IReadRepository<T>, IWriteRepository<T>*/{
    @Inject
    private schemaStore: SchemasStore;

    protected model: mongoose.Model<any>;

    constructor(definition: { new() : T}){
        let schema = this.schemaStore.find<T>(definition);
        schema.schema.plugin(errorHandler);
        this.model = mongoose.model(schema.name, schema.schema);
    }

    create (item: T) {
        return this.model.create(item);
    }

    save (item: T, cb?: Callback<T>){

    }

    upsert (cond: any, item: T, cb?: Callback<T>) {

    };

    delete (_id: string, cb?: Callback<T>) {

    }

    deleteAll (cb?: Callback<T>) {

    }

    deleteAllItems (items: T[], cb?: Callback<T>) {

    }

    retrieve (cb?: Callback<T>) {

    }

    findById (id: string, cb?: Callback<T>) {

    }

    findOne (cond: any, fields: any, options: any, cb?: Callback<T>) {

    }

    find (cond: any, fields: any, options: any, sortOptions?: any, cb?: Callback<T>) {

    }

    count (cond?: any) {

    }
}