import {ObjectID} from 'bson';

export abstract class BaseDocument {
    protected _id: ObjectID;
    protected __v?: number;
}