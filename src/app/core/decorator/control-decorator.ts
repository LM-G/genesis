import { FormControl } from '@angular/forms';
import { isNullOrUndefined } from 'util';

export const CONTROLS_TOKEN = '$$__genesis_controls';

export function Control(...args) {
    return (target: any, key: string) => {

        if (isNullOrUndefined(target.constructor[ CONTROLS_TOKEN ])) {
            Object.defineProperty(target.constructor, CONTROLS_TOKEN, {
                writable: false,
                enumerable: true,
                configurable: true,
                value: new Map()
            });
        }

        target.constructor[ CONTROLS_TOKEN ].set(key, new FormControl(...args));
    };
}
