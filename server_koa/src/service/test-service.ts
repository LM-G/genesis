import { Injectable } from '../core/decorator/injectable';
import { CreateUserForm } from '../form/create-user';
import { TestRepository } from '../repository/test';
import { Inject } from '../core/decorator/inject';
import { Test } from '../model/test';

/**
 * @class TestService
 */
@Injectable
export class TestService {
    @Inject
    private testRepository: TestRepository;

    async createTest(user: CreateUserForm) {
        const test = new Test();
        test.name = user.username;
        test.email = user.email;
        test.password = user.password;

        if(test.name == null || test.email == null || test.password == null){
            throw new Error('pas bien');
        }

        return await this.testRepository.create(test);
    }
}