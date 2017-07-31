import {Context} from 'koa';
import {Controller, NotProtected} from "../core/decorator/controller-decorator";
import {Post} from '../core/decorator/path-decorator';
import {AuthService} from '../service/auth-service';
import { Inject } from '../core/decorator/inject-decorator';

/**
 * @class AuthController.
 * @description Handles user registration, login or logout
 */
@Controller('/auth')
@NotProtected
export class AuthController {
    @Inject
    private authService : AuthService;

    @Post('/sign-up')
    async signUp (ctx: Context) {
        await this.authService.signUp(ctx.request.body);
        ctx.body = 'User registered'
    }

    @Post('/sign-in')
    async  signIn (ctx: Context) {
        ctx.body = 'tried to signIn';
    }
}
