import { Schema } from 'mongoose';
import { MongoError } from 'mongodb';
import { ConflictError } from '../error/conflict';

export function errorHandler(schema: Schema) {
    schema.post('save', (error, doc, next) => {
        if (error instanceof MongoError){
            let mssg: string;
            switch (error.code){
                case 11000:
                    mssg = handleDuplicateKey(error.message);
                    next(new ConflictError(mssg));
                    break;
                default:
                    next(new Error('Unhandled mongodb error'));
            }
        } else {
            next(error);
        }
    });

}

function handleDuplicateKey(msg: string){
    let substr = msg.split(': ');
    const key = substr[2].split('_1')[0];
    const value = substr[4].split('"')[1];
    return `Duplicate key "${key}" : ${value}`;
}