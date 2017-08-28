import {FunctionalError} from './functional';

export class ConflictError extends FunctionalError{
    constructor(message?: string, details?: any){
        super(message || 'The resource already exists', 409, details);
    }
}