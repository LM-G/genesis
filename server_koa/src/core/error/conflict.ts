import {FunctionalError} from './functional';

export class ConflictError extends FunctionalError{
    constructor(message?: string){
        super(message || 'The resource already exists', 409);
    }
}