import { Injector } from '../injector/injector-container';

/**
 * Decorator to bootstrap application framework
 * @returns {Function}
 */
export function application() {
    return (target: any) => {
        // init dependecy injection system
        Injector.init();
    }
}
