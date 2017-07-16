import * as Logger from 'koa-logger';
import * as Koa from 'koa';
import * as BodyParser from 'koa-bodyparser';
import {config} from './config/config';
import {RouterLoader} from './middlewares/router-loader';

global.__srcDir = __dirname;

// create the app
let app = new Koa();
// app port
const port = config.port;

app
	.use(Logger())
	.use(BodyParser())
	.use(RouterLoader())
	.listen(port, () => console.log(`Listening on ${port}`));