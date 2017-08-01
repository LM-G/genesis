import {Context} from 'koa';
import {Controller, NotProtected} from "../core/decorator/controller-decorator";
import {Post} from '../core/decorator/path-decorator';
import { Inject } from '../core/decorator/inject-decorator';
import {UserService} from '../service/user-service';
import {CipherService} from '../service/cipher-service';
import {IUser} from '../model/interface/user';

/**
 * @class AuthController.
 * @description Handles user registration, login or logout
 */
@Controller('/auth')
@NotProtected
export class AuthController {
    @Inject
    private userService : UserService;

    @Inject
    private cipherService : CipherService;


    @Post('/sign-up')
    async signUp (ctx: Context) {
        //await this.authService.signUp(ctx.request.body);
        ctx.body = 'User registered'
    }

    @Post('/sign-in')
    async signIn (ctx: Context) {
        try {
            const user: IUser = await this.userService.getUser();
            if(!user) {
                ctx.status = 404;
                ctx.body = "User not found";
            }
            const isGoodPassword = await this.cipherService.comparePassword(ctx.request.body.password, user);
            if(isGoodPassword){
               ctx.body = "User connected";
            }
        } catch (err){
            console.log(err);
        }
    }
}
