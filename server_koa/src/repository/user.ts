import { Repository } from '../core/decorator/repository';
import { BaseRepository } from '../core/odm/base-repository';
import { User } from '../model/user';

@Repository(User)
export class TestRepository extends BaseRepository<User>{}