import * as mongoose from 'mongoose';
import {Inject} from '../decorator/inject';
import {SchemasStore} from './schemas-store';
import {errorHandler} from './mongo-error-handler';

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

    update (id: string, item: T){
        return this.model.findByIdAndUpdate(id, item);
    }

    upsert (cond: any, item: T) {
    }

    delete (_id: string) {

    }

    deleteAll () {

    }

    deleteAllItems (items: T[]) {

    }

    retrieve () {

    }

    findById (id: string) {

    }

    findOne (cond: any, fields: any, options: any) {

    }

    find (cond: any, fields: any, options: any, sortOptions?: any) {

    }

    count (cond?: any) {

    }
}