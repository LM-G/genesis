import { Controller, Post, Body, Inject, DataNotFoundError, UnauthorizedError } from '../core';
import { UserService } from '../service/user-service';
import { CipherService } from '../service/cipher-service';
import { CreateUserForm } from '../form/create-user';
import { IUser } from '../model/interface/user';
import { LoginForm } from '../form/login';
import {User} from '../model/user';
import {Validate, validateSync} from 'class-validator';

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
    async signUp (@Body() form : CreateUserForm) {
        let user = new User();
        Object.assign(user, form);
        // hash password
        await this.cipherService.hashPassword(user);

        // save user
        await this.userService.createUser(user);
    }


    @Post('/sign-in')
    async signIn (@Body() form: LoginForm) {
        // Gets user
        const user: IUser = await this.userService.getUser(form.username);
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
