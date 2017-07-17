import {Document, Model, model, Schema} from 'mongoose';
import {IUser} from './interface/IUser';

export interface IUserModel extends Document, IUser {}

export var userSchema : Schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['client', 'manager', 'admin'],
        default: 'client'
    },
    actif: {
        type: Boolean,
        default: true
    }
});

// Duplicate the ID field
userSchema
    .virtual('id')
    .get(function() {
        return this._id.toHexString();
    });

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
    virtuals: true
});

// Define the user model
export const User: Model<IUserModel> = model<IUserModel>("User", userSchema);