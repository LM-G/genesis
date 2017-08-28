import { Injector } from '../injector/injector-container';

type Constructor<T = {}> = new (...args: any[]) => T;
export function Repository(definition: any){
    return <T extends Constructor>(target: T) => {
        let cheat: any = {};
        cheat[target.name] = class extends target {
            constructor(...args: any[]){
                super(definition);
            }
        };

        Injector.register(target.name, cheat[target.name]);
        return cheat[target.name];
    }
}