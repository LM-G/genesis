import {Context} from 'koa';
import * as jwt from 'jsonwebtoken';
import * as jwtConfig from "../../../config/passport";
import {UnauthorizedException} from '../exception/unauthorized.exception';
const AUTHORIZATION = 'authorization';
export function AuthGuard(ctx: Context, next: () => Promise<any>){
    try {
        let token = ctx.headers[AUTHORIZATION].substr(7);
        jwt.verify(token, jwtConfig.SECRET, {
            algorithms: [jwtConfig.ALGORITHM],
            issuer: jwtConfig.ISSUER,
            audience: jwtConfig.AUDIENCE
        });

        next();
    } catch(err){
        throw new UnauthorizedException(err.message);
    }
}