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
    router.get('/', index);
    router.get('/login', login);
  }
}

/**
 * Default message
 * @param ctx
 * @returns {Promise.<void>}
 */
let index = async(ctx: Context) => {
  ctx.body = 'Hello Auth Controller';
};

/**
 * Log in an user;
 * @param ctx
 * @returns {Promise.<void>}
 */
let login = async(ctx: Context) => {
  ctx.body = 'tried to signin';
};

