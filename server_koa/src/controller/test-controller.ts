import { Context } from 'koa';
import { controller } from "../core/decorator/controller-decorator";
import { get, post } from '../core/decorator/path-decorator';


@controller('/test')
export class TestController {
    @get('/a')
    async getA(ctx: Context) {
        ctx.body = 'TestController : A'
    };

    @post('/b')
    async getB(ctx: Context) {
        ctx.body = 'TestController : B';
    }
}
