import { Injectable } from '../core/decorator/injectable';
import { UserRepository } from '../repository/user';
import { User } from '../model/user';
import { Inject } from '../core/decorator/inject';

/**
 * @class UserService
 */
@Injectable
export class UserService {
    @Inject
    private userRepository: UserRepository;

    getUser(username: string) {
        return username === 'toto' ? {
            id : 1,
            username: 'toto',
            password: '$2a$10$WEhxl44JPrA/LGA6cmp6CuvTLGE3rnRQwSiEHhODPM9XO59vlhcBa'
        } : null;
    }

    createUser = async (user: User) => {
        let userCreated = await this.userRepository.save(user);

        console.log(`Id: ${user.id}`)
    };
}