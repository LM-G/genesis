import { Controller } from '../core/decorator/controller-decorator';
import { Get, Post } from '../core/decorator/action-decorator';
import { Context } from 'koa';
import { Param } from '../core/decorator/param-decorator';
import { UserService } from '../service/user-service';
import { Inject } from '../core/decorator/inject-decorator';

@Controller('/test')
export class TestController {
    @Inject
    private userService : UserService;

    @Get('/a/:id')
    async getA(@Param("id") id: string) {
        let result = await this.userService.getUser('toto');
        return `TestController : ${JSON.stringify(result)}`;
    };

    @Post('/b')
    async getB() {
        return 'TestController : B';
    }
}
