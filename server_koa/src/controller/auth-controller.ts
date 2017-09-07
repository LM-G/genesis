import {Body, Controller, DataNotFoundError, Inject, Post, UnauthorizedError} from '../core';
import {UserService} from '../service/user-service';
import {CipherService} from '../service/cipher-service';
import {LoginForm} from '../form/login';
import {CreateUserForm} from '../form/create-user';
import {User} from '../model/user';
import {HttpStatus} from '../core/decorator/http-status';
import {pick} from 'lodash';

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
    async signUp (@Body() form : CreateUserForm): Promise<User> {
        const user = form as User;
        // hash password
        await this.cipherService.hashPassword(user);

        // save user
        const userCreated = await this.userService.createUser(user);
        return pick(userCreated, 'id');
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
