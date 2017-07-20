import {BaseRepository} from './base-repository';
import {IUserModel, User} from '../model/user';
export class UserRepository extends BaseRepository<IUserModel>{
    constructor(){
        super(User);
    }
}