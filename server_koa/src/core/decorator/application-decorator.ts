import { Injector } from '../injector/injector-container';

type ApplicationOptions = {
    // root dir location
    root: string,
    // controllers dir name
    endpoints: string
}

/**
 * Decorator to bootstrap application framework
 * @returns {Function}
 */
export function Application(opts: ApplicationOptions) {
    // defines root dir location
    const root = global.__srcDir = opts.root;

    // require all controllers to init their decorators
    require('require-all')({
        dirname     :  root + '/' + opts.endpoints,
        filter      :  /(.+-controller)\.js$/
    });

    return (target: any) => {
        // init dependecy injection system
        Injector.init();
    }
}
