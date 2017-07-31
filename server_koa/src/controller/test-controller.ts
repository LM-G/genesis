import { Context } from 'koa';
import { Controller } from "../core/decorator/controller-decorator";
import { Get, Post } from '../core/decorator/path-decorator';


@Controller('/test')
export class TestController {
    @Get('/a')
    async getA(ctx: Context) {
        ctx.body = 'TestController : A'
    };

    @Post('/b')
    async getB(ctx: Context) {
        ctx.body = 'TestController : B';
    }
}
