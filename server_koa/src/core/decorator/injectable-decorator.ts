import {InjectorContainer} from '../injector/injector-container';

export function injectable(target: any) {
    InjectorContainer.register(target.name, target);
}