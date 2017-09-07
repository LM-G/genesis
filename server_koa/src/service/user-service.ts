import {Injectable} from '../core/decorator/injectable';
import {UserRepository} from '../repository/user';
import {User} from '../model/user';
import {Inject} from '../core/decorator/inject';

/**
 * @class UserService
 */
@Injectable
export class UserService {
    @Inject
    private userRepository: UserRepository;

    async getUser(username: string) {
        return new User();
    }

    async createUser(user: User) {
        await this.userRepository.create(user);
        return user;
    };
}