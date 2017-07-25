import {Context} from 'koa';
import {controller} from "../core/decorator/controller-decorator";
import {post} from '../core/decorator/path-decorator';
import {AuthService} from '../service/auth-service';



/**
 * AuthController. Handles user registration, login or logout
 */
@controller('/auth')
export class AuthController {
    private authService : AuthService;
    constructor(){
        // todo injection (ioc ?)
        this.authService = new AuthService();
    }

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
