import {Context} from 'koa';
import {Controller} from "../core/decorator/controller-decorator";
import {Post, Public} from '../core/decorator/path-decorator';
import {Inject} from '../core/decorator/inject-decorator';
import {UserService} from '../service/user-service';
import {CipherService} from '../service/cipher-service';
import {IUser} from '../model/interface/user';
import {DataNotFoundException} from '../core/exception/data-not-found.exception';

/**
 * @class AuthController.
 * @description Handles user registration, login or logout
 */
@Controller('/auth')
export class AuthController {
    @Inject
    private userService : UserService;

    @Inject
    private cipherService : CipherService;

    @Public
    @Post('/sign-up')
    async signUp (ctx: Context) {
        //await this.authService.signUp(ctx.request.body);
        ctx.body = 'User registered'
    }

    @Public
    @Post('/sign-in')
    async signIn (ctx: Context) {
        /* Gets user */
        const user: IUser = await this.userService.getUser(ctx.request.body.username);
        if(user == null) {
            throw new DataNotFoundException("User not found");
        }
        /* Password validation */
        const isGoodPassword = await this.cipherService.comparePassword(ctx.request.body.password, user);
        if(isGoodPassword){
           ctx.body = "User connected";
        }
    }
}
