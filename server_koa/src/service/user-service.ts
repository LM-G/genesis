import {ICreateUser} from '../form/create-user';
import {Injectable} from '../core/decorator/injectable-decorator';

/**
 * @class UserService
 */
@Injectable
export class UserService {

    getUser() {
        return {
            id : 1,
            username: "toto",
            password: "$2a$10$WEhxl44JPrA/LGA6cmp6CuvTLGE3rnRQwSiEHhODPM9XO59vlhcBa"
        };
    }

    createUser = (body: ICreateUser) => {
        const email = body.email;
        const pwd = body.password;
        const name = body.username;
        console.log(`Email : ${email} - Password: ${pwd} - Password: ${name}`)
    };
}