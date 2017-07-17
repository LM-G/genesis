import { BaseController } from "./BaseController";
import { Controller } from "../util/@Controller";
import { Context } from 'koa';
import * as Router from 'koa-router';
import {AuthService} from '../service/AuthService';

/**
 * AuthController. Handles user registration, login or logout
 */
@Controller('/auth')
export class AuthController extends BaseController {
  authService : AuthService;
  constructor(){
    super();
    // TODO injection de dépendance
    this.authService = new AuthService();
  }
  register(router:Router) {
    router.post('/sign-up', this.signUp);
    router.post('/sign-in', this.signIn);
  }

  private signUp = async (ctx: Context) => {
      await this.authService.signUp(ctx.request.body);
      ctx.body = 'User registered'
  };

  private  signIn = async(ctx: Context) => {
    ctx.body = 'tried to signIn';
  }
}

