import 'reflect-metadata';
import * as Logger from 'koa-logger';
import * as Koa from 'koa';
import * as BodyParser from 'koa-bodyparser';
import {config} from '../config/environment';
import { application } from './core/decorator/application-decorator';
import {RouterLoader} from './core/middleware/router-loader';

/**
 * Application bootstrap class
 */
@application({
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
            .use(RouterLoader());

        // start to listen
        app.listen(port, () => console.log(`Listening on ${port}`));
	}
}

// starts the app
App.start();
