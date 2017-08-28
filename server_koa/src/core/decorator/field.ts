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