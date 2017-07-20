import {Model, Document} from 'mongoose';
import {ObjectID} from 'bson';
export type Callback<T> = (error:any, result: T)=> void;
export abstract class BaseRepository<T extends Document> {
    private model: Model<T>;

    constructor(model : Model<T>){
        this.model = model;
    }

    create(item: T, cb: Callback<T>) {
        this.model.create(item, cb);
    }

    retrieve (cb: Callback<Array<T>>) {
        this.model.find({},cb);
    }

    update (id: ObjectID, item: T, cb: Callback<T>) {
        this.model.update({_id: id}, item, cb);
    }

    findById(id: ObjectID, cb: Callback<T>){
        this.model.findById(id, cb);
    }

    delete (id: string, cb: Callback<null>) {
        this.model.remove({id: this.toObjectId(id)}, (err) => cb(err, null));
    }

    private toObjectId (id: string) : ObjectID {
        return ObjectID.createFromHexString(id)
    }

}