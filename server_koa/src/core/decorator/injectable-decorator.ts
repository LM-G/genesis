import {Injector} from '../injector/injector-container';

export function Injectable(target: any) {
    Injector.register(target.name, target);
}