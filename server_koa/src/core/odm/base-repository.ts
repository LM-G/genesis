import * as mongoose from 'mongoose';
import {Inject} from '../decorator/inject';
import {SchemasStore} from './schemas-store';
import {errorHandler} from './mongo-error-handler';
import {assign} from 'lodash';

/*
import { IWriteRepository } from './interface/write';
import { IReadRepository } from './interface/read';
*/

export abstract class BaseRepository<T> /*implements IReadRepository<T>, IWriteRepository<T>*/{

    @Inject
    private schemaStore: SchemasStore;

    protected model: mongoose.Model<any>;

    constructor(definition: { new() : T}){
        let schemaContainer = this.schemaStore.find<T>(definition);
        schemaContainer.schema.plugin(errorHandler);
        this.model = mongoose.model(schemaContainer.name, schemaContainer.schema);
    }


    async create (item: T) {
        const itemCreated = await this.model.create(item);
        return this.convert(item, itemCreated);
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

    protected convert(item: T, model: any){
        let test = model.toObject({ virtuals: true });
        return assign(item, test);
    }
}