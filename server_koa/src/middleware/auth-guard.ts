import { Context } from 'koa';
import * as jwt from 'jsonwebtoken';
import * as jwtConfig from "../../config/passport";
import { UnauthorizedError } from '../core';

const AUTHORIZATION = 'authorization';

export function AuthGuard(){
    return async (ctx: Context, next: () => Promise<any>) => {
        const authorization = ctx.headers[AUTHORIZATION];
        if(authorization == null){
            throw new UnauthorizedError('Authorization header is missing');
        }
        let token = ctx.headers[AUTHORIZATION].substr(7);
        try {
            jwt.verify(token, jwtConfig.SECRET, {
                algorithms: [jwtConfig.ALGORITHM],
                issuer: jwtConfig.ISSUER,
                audience: jwtConfig.AUDIENCE
            });
        } catch(err){
            throw new UnauthorizedError(err.message || err);
        }

        next();
    }
}