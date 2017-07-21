import {UserRepository} from '../repository/user-repository';
import {ICreateUser} from '../form/create-user';
import {inject, injectable} from 'inversify';

export class AuthService {
    private userRepository: UserRepository;
    constructor(){
    }

    signUp = (body: ICreateUser) => {
        const email = body.email;
        const pwd = body.password;
        const name = body.username;
        console.log(`Email : ${email} - Password: ${pwd} - Password: ${name}`)
    }
}