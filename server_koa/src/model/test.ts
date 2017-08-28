import { Document } from '../core/decorator/document';
import { Field } from '../core/decorator/field';

@Document({
    name: 'Test'
})
export class Test {
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
}