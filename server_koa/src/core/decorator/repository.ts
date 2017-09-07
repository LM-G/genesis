import { Injector } from '../injector/injector-container';

type Constructor<T = {}> = new (...args: any[]) => T;
export function Repository(definition: any){
    return <T extends Constructor>(target: T) => {
        let cheatedType: any = {};
        cheatedType[target.name] = class extends target {
            constructor(...args: any[]){
                super(definition);
            }
        };

        Injector.register(target.name, cheatedType[target.name]);
        return cheatedType[target.name];
    }
}