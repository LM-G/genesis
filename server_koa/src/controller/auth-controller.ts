import {Context} from 'koa';
import {controller} from "../core/decorator/controller-decorator";
import {post} from '../core/decorator/path-decorator';
import {AuthService} from '../service/auth-service';
import { inject } from '../core/decorator/inject-decorator';

/**
 * @class AuthController.
 * @description Handles user registration, login or logout
 */
@controller('/auth', {
    authenticated : false
})
export class AuthController {
    @inject
    private authService : AuthService;

    @post('/sign-up')
    async signUp (ctx: Context) {
        await this.authService.signUp(ctx.request.body);
        ctx.body = 'User registered'
    }

    @post('/sign-in')
    async  signIn (ctx: Context) {
        ctx.body = 'tried to signIn';
    }
}
