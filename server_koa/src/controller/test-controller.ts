import { Controller, Get, Post, Body, Param, Inject } from '../core';
import { UserService } from '../service/user-service';

@Controller('/test')
export class TestController {
    @Inject
    private userService : UserService;

    @Get('/a/:id')
    async getA(@Param("id") id: string) {
        let result = await this.userService.getUser('toto');
        return `TestController : ${JSON.stringify(result)}`;
    };

    @Post('/b/:id')
    async getB(@Param("id") id: string, @Body() body: any) {
        return `TestController : B -> ${id} - ${JSON.stringify(body)}`;
    }
}
