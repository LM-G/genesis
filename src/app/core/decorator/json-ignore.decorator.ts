import { FormControl } from '@angular/forms';
import { isNullOrUndefined } from 'util';

export function Control(...args) : Function{
    return (target: any, key: string) => {
        console.log(target, key);

        if(isNullOrUndefined(target.constructor.controls)) {
            Object.defineProperty(target.constructor, "controls", {
                writable: false,
                enumerable: true,
                configurable: true,
                value: new Map()
            });
        }

        target.constructor.controls.set(key, new FormControl(...args));
    }
}