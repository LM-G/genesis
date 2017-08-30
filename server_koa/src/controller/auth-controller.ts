import {Body, Controller, DataNotFoundError, Inject, Post, UnauthorizedError} from '../core';
import {UserService} from '../service/user-service';
import {CipherService} from '../service/cipher-service';
import {LoginForm} from '../form/login';
import {CreateUserForm} from '../form/create-user';
import {User} from '../model/user';
import {HttpStatus} from '../core/decorator/http-status';

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

    @HttpStatus(201)
    @Post('/sign-up')
    async signUp (@Body() form : CreateUserForm) {
        let user = new User();
        Object.assign(user, form);
        // hash password
        await this.cipherService.hashPassword(user);

        // save user
        return await this.userService.createUser(user);
    }


    @Post('/sign-in')
    async signIn (@Body() form: LoginForm) {
        // Gets user
        const user = await this.userService.getUser(form.username);
        if(user == null) {
            throw new DataNotFoundError("User not found");
        }
        // Password validation
        const isGoodPassword = await this.cipherService.comparePassword(form.password, user);
        if(isGoodPassword){
           return "User connected";
        } else {
            throw new UnauthorizedError('Wrong password');
        }
    }
}
