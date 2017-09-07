import {ObjectID} from 'bson';

export abstract class BaseDocument {
    _id: ObjectID;
    __v: number;
    createdAt: Date;
    updatedAt: Date;
}