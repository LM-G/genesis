import {CreateUserForm} from '../form/create-user';
import {Injectable} from '../core/decorator/injectable-decorator';

/**
 * @class UserService
 */
@Injectable
export class UserService {

    getUser(username: string) {
        return username === 'toto' ? {
            id : 1,
            username: 'toto',
            password: '$2a$10$WEhxl44JPrA/LGA6cmp6CuvTLGE3rnRQwSiEHhODPM9XO59vlhcBa'
        } : null;
    }

    createUser = (body: CreateUserForm) => {
        const email = body.email;
        const pwd = body.password;
        const name = body.username;
        console.log(`Email : ${email} - Password: ${pwd} - Password: ${name}`)
    };
}