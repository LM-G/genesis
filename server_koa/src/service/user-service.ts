import { Injectable } from '../core/decorator/injectable';
import { UserRepository } from '../repository/user';
import { User } from '../model/user';
import { Inject } from '../core/decorator/inject';
import { keys } from 'lodash';
import {IUser} from 'genesis-common';

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

    async createUser(user: User) {
        await this.userRepository.create(user);
        return user;
    };
}