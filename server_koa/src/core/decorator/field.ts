import { FieldMetadata } from '../metadata/field';
import { registerFieldMetadata } from '../index';

export function Field(opts: Object) {
    return (target: Object, property: string) => {
        const meta = new FieldMetadata({
            target: target.constructor,
            property: property,
            options: opts
        });
        registerFieldMetadata(meta);
    }
}

export function Id() {
    return (target: Object, property: string) => {
        const meta = new FieldMetadata({
            target: target.constructor,
            property: property,
            options: {
                get : function() { return this._id.toHexString(); }
            },
            virtual: true,
            embedded: false
        });

        registerFieldMetadata(meta);
    }
}

export function Embedded() {
    return (target: Object, property: string) => {
        const meta = new FieldMetadata({
            target: target.constructor,
            property: property,
            options: {
              schema: Reflect.getMetadata("design:type", target, property)
            },
            virtual: false,
            embedded: true
        });

        registerFieldMetadata(meta);
    }
}