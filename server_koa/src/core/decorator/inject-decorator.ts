import {InjectorContainer} from '../injector/injector-container';

export function inject(target: any, key: string){
    let clazz = Reflect.getMetadata("design:type", target, key);
    // property getter
    let getter = function () {
        return InjectorContainer.resolve(clazz.name);
    };

    // Delete property.
    if (delete target[key]) {
        // Create new property with getter and setter
        Object.defineProperty(target, key, {
            get: getter,
            enumerable: true,
            configurable: true
        });
    }
}