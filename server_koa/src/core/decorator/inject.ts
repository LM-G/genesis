import {Injector} from '../injector/injector-container';

export function Inject(target: any, key: string){
    let prototype = Reflect.getMetadata("design:type", target, key);
    // property getter
    let getter = function () {
        return Injector.resolve(prototype.name);
    };

    // Alter property with new getter
    Object.defineProperty(target, key, {
        get: getter
    });
}