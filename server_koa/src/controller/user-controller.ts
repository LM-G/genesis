import {Controller} from '../core/decorator/controller-decorator';
import {BaseController} from './base-controller';
import * as Router from 'koa-router';

@Controller('/me')
export class UserController extends BaseController {
    register(router: Router): void {
    }

}