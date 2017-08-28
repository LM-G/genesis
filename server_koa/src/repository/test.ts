import { BaseRepository } from '../core/odm/base-repository';
import { Test } from '../model/test';
import { Repository } from '../core/decorator/repository';

@Repository(Test)
export class TestRepository extends BaseRepository<Test>{}