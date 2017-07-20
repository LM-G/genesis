export function Application(): Function{
    return function<T>(constructor: new(...args: any[]) => T){
        return constructor;
    }
}