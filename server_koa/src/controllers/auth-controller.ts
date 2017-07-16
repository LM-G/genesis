import { BaseController } from "./base-controller";
import { Controller } from "../utils/@controller";
import { Context } from 'koa';
import * as Router from 'koa-router';

/**
 * AuthController. Handles user registration, login or logout
 */
@Controller('/auth')
export class AuthController extends BaseController {
  constructor(){
    super();
  }
  register(router:Router) {
    router.post('/sign-up', signUp);
    router.post('/sign-in', signIn);
  }
}

let signUp = async(ctx: Context) => {
  // todo create authservice
  ctx.body = 'tried to signUp';
};
let signIn = async(ctx: Context) => {
  ctx.body = 'tried to signIn';
};

