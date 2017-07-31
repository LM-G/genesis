import 'reflect-metadata';
import * as Logger from 'koa-logger';
import * as Koa from 'koa';
import * as BodyParser from 'koa-bodyparser';
import {config} from '../config/environment';
import { Application } from './core/decorator/application-decorator';
import {RouterLoader} from './core/middleware/router-loader';
import {Securizer} from "./core/middleware/securizer";

/**
 * Application bootstrap class
 */
@Application({
    root: __dirname,
    endpoints : 'controller'
})
export class App {
    /**
     * Starts the application
     */
	static start(){
        // create the app
        let app = new Koa();
		// app port
        const port = config.port;

        // middlewares registration
        app
            .use(Logger())
            .use(BodyParser())
            .use(RouterLoader())
            .use(Securizer());

        // start to listen
        app.listen(port, () => console.log(`Listening on ${port}`));
	}
}

// starts the app
App.start();
