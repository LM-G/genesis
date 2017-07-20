import * as Logger from 'koa-logger';
import * as Koa from 'koa';
import * as BodyParser from 'koa-bodyparser';
import {config} from '../config/environment';
import {RouterLoader} from './core/middleware/router-loader';
import {Application} from './core/decorator/application-decorator';
import {AppIocContainer} from './core/app-ioc-container';

@Application()
export class App {
	private koa: Koa;
	private container: AppIocContainer;
	constructor(){

	}

	start(){
        // create the app
        let app = new Koa();
		// app port
        const port = config.port;
        app
            .use(Logger())
            .use(BodyParser())
            .use(RouterLoader(this.container))
            .listen(port, () => console.log(`Listening on ${port}`));
	}
}