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
    controllers: any[];
    injectables: Map<string, Injectable>;
    constructor(){
        this.controllers = [];
        this.injectables = new Map();
    }
}

let container = new Container();


export class Injector {
    static init(){
        container.injectables.forEach((injectable) => {
            injectable.createInstance();
        });
    }

    static resolve(name: string){
        return container.injectables.get(name).instance;
    }

    static register(name: string, prototype: any){
        if(container == null){
            throw new Error("Injector container has not been initialized !");
        }

        let injectable = new Injectable(prototype);

        container.injectables.set(name, injectable);
    }

    static registerController(prototype : any){
        let controllers = container.controllers || [];
        controllers.push(prototype);
    }

    static getControllers(){
        return container.controllers;
    }
}