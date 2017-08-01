import {ExtractJwt} from 'passport-jwt';

export const EXPIRES_IN_SECONDES = 86400;
export const SECRET = "secr3t";
export const ALGORITHM = "HS256";
export const ISSUER = "genesis.com";
export const AUDIENCE = "genesis.com";

/**
 * Configuration object for local strategy authentication
 */
export const LOCAL_STRATEGY_CONFIG = Object.freeze({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: false,
    session: false
});

/**
 * Configuration object for jwt strategy authentication
 */
export const JWT_STRATEGY_CONFIG = Object.freeze({
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: SECRET,
    issuer : ISSUER,
    audience: AUDIENCE
});