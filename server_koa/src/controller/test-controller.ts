import { Body, Controller, Get, Inject, Param, Post } from '../core';
import { TestService } from '../service/test-service';
import { CreateUserForm } from '../form/create-user';


@Controller('/test')
export class TestController {
    @Inject
    private testService : TestService;

    @Get('/a/:id')
    async getA(@Param("id") id: string) {
        return `TestController : A ->  ${JSON.stringify(id)}`;
    };

    @Post('/b/:id')
    async getB(@Param("id") id: string, @Body() body: any) {
        return `TestController : B -> ${id} - ${JSON.stringify(body)}`;
    }

    @Post('/c')
    async testC(@Body() user: CreateUserForm) {
        let test = await this.testService.createTest(user);

        return `TestController : C -> ${JSON.stringify(test)}`;
    }
}
