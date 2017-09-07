import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import {IUser} from 'genesis-common';
import * as jwtConfig from "../../config/passport";
import {Injectable} from '../core/decorator/injectable';
import {User} from '../model/user';

@Injectable
export class CipherService {
    /**
     * Hash the password field of the passed user.
     */
    hashPassword(user: User) {
        if (user.password) {
            user.password = bcrypt.hashSync(user.password, 10);
        }
    }

    /**
     * Compare user password hash with unhashed password
     * @returns boolean indicating a match
     */
    comparePassword(password: string, user: User) {
        return bcrypt.compareSync(password, user.password);
    }

    /**
     * Create a token based on the passed user
     * @param user
     */
    createToken(user: User) {
        return jwt.sign({
                user: user
            },
            jwtConfig.SECRET,
            {
                algorithm: jwtConfig.ALGORITHM,
                expiresIn: jwtConfig.EXPIRES_IN_SECONDES,
                issuer: jwtConfig.ISSUER,
                audience: jwtConfig.AUDIENCE
            }
        );
    }

    verify(token: string){
        return jwt.verify(token, jwtConfig.SECRET, {
            algorithms: [jwtConfig.ALGORITHM],
            issuer: jwtConfig.ISSUER,
            audience: jwtConfig.AUDIENCE
        });
    }
}