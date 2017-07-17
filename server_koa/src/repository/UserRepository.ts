import {BaseRepository} from './BaseRepository';
import {IUserModel, User} from '../model/User';
export class UserRepository extends BaseRepository<IUserModel>{
    constructor(){
        super(User);
    }
}