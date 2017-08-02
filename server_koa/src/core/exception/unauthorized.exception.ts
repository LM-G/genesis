import {FunctionalException} from './functional.exception';

export class UnauthorizedException extends FunctionalException{
    status = 401;
    message = 'Action non autorisée';
    constructor(message?: string){
        super();
        if(message){
            this.message = message;
        }
    }
}