let container: Container;

class Container{
    injectables: Map<string, any>;
    constructor(){
        this.injectables = new Map();
    }
}

export class InjectorContainer {
    static init(){
        container = new Container();
    }

    static resolve(name: string){
        container.injectables.get(name);
    }

    static register(name: string, injectable : any){
        if(container == null){
            throw new Error("Injector container has not been initialized !");
        }

        container.injectables.set(name, Object.create(injectable));
    }
}