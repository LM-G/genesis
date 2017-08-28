import {FunctionalError} from './functional';

export class UnauthorizedError extends FunctionalError{
    constructor(message?: string){
        super(message ||'Action non autorisée', 401);
    }
}