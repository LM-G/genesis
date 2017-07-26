import * as Logger from 'koa-logger';
import * as Koa from 'koa';
import * as BodyParser from 'koa-bodyparser';
import {config} from '../config/environment';
import {RouterLoader} from './core/middleware/router-loader';
import { application } from './core/decorator/application-decorator';

@application()
export class App {
    /**
     * Register all middlewares and start koa application
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
