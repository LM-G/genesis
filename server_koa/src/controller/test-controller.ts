import {Context} from 'koa';
import {controller} from "../core/decorator/controller-decorator";
import {get, post} from '../core/decorator/path-decorator';
import {inject} from '../core/decorator/inject-decorator';
import {AuthService} from '../service/auth-service';


@controller('/test')
export class TestController {
    @inject
    private test: AuthService;

    @get('/a')
    async getA(ctx: Context) {
        console.log(this.test);
        ctx.body = 'TestController : A'
    };

    @post('/b')
    async getB(ctx: Context) {
        ctx.body = 'TestController : B';
    }
}
