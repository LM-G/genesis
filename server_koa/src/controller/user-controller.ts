import {Controller} from '../core/decorator/controller';
import { AuthGuard } from '../middleware/auth-guard';
import { Before } from '../core/decorator/middleware';

@Before(AuthGuard)
@Controller('/me')
export class UserController {

}