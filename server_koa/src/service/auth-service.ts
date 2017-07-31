import {ICreateUser} from '../form/create-user';
import {Injectable} from '../core/decorator/injectable-decorator';

/**
 * @class AuthService
 */
@Injectable
export class AuthService {
    signUp = (body: ICreateUser) => {
        const email = body.email;
        const pwd = body.password;
        const name = body.username;
        console.log(`Email : ${email} - Password: ${pwd} - Password: ${name}`)
    };
}