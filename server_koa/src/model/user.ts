import { Field } from '../core/decorator/field';
import { Document } from "../core/decorator/document";
import {IUser} from 'genesis-common';
import {BaseDocument} from './base';

@Document({
    name: 'User',
    options : {
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
})
export class User extends BaseDocument implements IUser{
    @Field({
        unique: true,
        required: true
    })
    name: string;

    @Field({
        lowercase: true,
        unique: true,
        required: true
    })
    email: string;

    @Field({
        required: true
    })
    password: string;

    @Field({
        enum: ['client', 'manager', 'admin'],
        default: 'client'
    })
    role: string;

    @Field({
        default: true
    })
    active: boolean;
}