import { isNullOrUndefined } from 'util';

export const IGNGORES_TOKEN = '$$__genesis_ignores';

export const JsonIgnore = (target: any, key: string) => {

    if (isNullOrUndefined(target.constructor[ IGNGORES_TOKEN ])) {
        Object.defineProperty(target.constructor, IGNGORES_TOKEN, {
            writable: false,
            enumerable: true,
            configurable: true,
            value: []
        });
    }

    target.constructor[ IGNGORES_TOKEN ].push(key);
};
