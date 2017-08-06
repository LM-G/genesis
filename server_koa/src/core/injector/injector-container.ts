class Injectable{
    instance: any;
    prototype: any;
    constructor(prototype: any){
        this.prototype = prototype;
    }
    createInstance(){
        this.instance = new this.prototype();
    }
}

class Container{
    injectables: Map<string, Injectable>;
    constructor(){
        this.injectables = new Map();
    }
}

let container = new Container();


export class Injector {
    static resolve(name: string){
        return container.injectables.get(name).instance;
    }

    static register(name: string, prototype: any){
        if(container == null){
            throw new Error("Injector container has not been initialized !");
        }

        let injectable = new Injectable(prototype);
        injectable.createInstance();
        container.injectables.set(name, injectable);
    }
}