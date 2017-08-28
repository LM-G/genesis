import {CreateUserForm} from '../form/create-user';
import {Injectable} from '../core/decorator/injectable';

/**
 * @class UserService
 */
@Injectable
export class UserService {
    private userRepository: UserRepository;

    getUser(username: string) {
        return username === 'toto' ? {
            id : 1,
            username: 'toto',
            password: '$2a$10$WEhxl44JPrA/LGA6cmp6CuvTLGE3rnRQwSiEHhODPM9XO59vlhcBa'
        } : null;
    }

    createUser = (form: CreateUserForm) => {
        const email = form.email;
        const pwd = form.password;
        const name = form.username;
        console.log(`Email : ${email} - Password: ${pwd} - Password: ${name}`)
    };
}