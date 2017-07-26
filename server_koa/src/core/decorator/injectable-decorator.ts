import {Injector} from '../injector/injector-container';

export function injectable(target: any) {
    Injector.register(target.name, target);
}