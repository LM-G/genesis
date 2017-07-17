import {UserRepository} from '../repository/UserRepository';
import {ICreateUser} from '../form/ICreateUser';

export class AuthService {
    private userRepository: UserRepository;
    constructor(){
        this.userRepository = new UserRepository();
    }

    signUp = (body: ICreateUser) => {
        const email = body.email;
        const pwd = body.password;
        const name = body.username;
        console.log(`Email : ${email} - Password: ${pwd} - Password: ${name}`)
    }
}