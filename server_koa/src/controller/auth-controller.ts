import { Context } from 'koa';
import { Controller } from "../core/decorator/controller-decorator";
import { Post } from '../core/decorator/action-decorator';
import { Inject } from '../core/decorator/inject-decorator';
import { UserService } from '../service/user-service';
import { CipherService } from '../service/cipher-service';
import { Body } from '../core';
import { ICreateUser } from '../form/create-user';
import { IUser } from '../model/interface/user';
import { DataNotFoundException } from '../core/exception/data-not-found.exception';
import { UnauthorizedException } from '../core/exception/unauthorized.exception';

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


    @Post('/sign-up')
    async signUp (@Body() body :ICreateUser) {
        await this.userService.createUser(body);
    }


    @Post('/sign-in')
    async signIn (@Body() body: any) {
        // Gets user
        const user: IUser = await this.userService.getUser(body.username);
        if(user == null) {
            throw new DataNotFoundException("User not found");
        }
        // Password validation
        const isGoodPassword = await this.cipherService.comparePassword(body.password, user);
        if(isGoodPassword){
           return "User connected";
        } else {
            throw new UnauthorizedException('Wrong password');
        }
    }
}
