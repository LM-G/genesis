import { Field } from '../core/decorator/field';
import { Document } from "../core/decorator/document";


@Document({
    name: 'User'
})
export class User {
    @Field({
        unique: true,
        required: true
    })
    name: String;

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

    get id(): string{
        return 'todo';
    }
}