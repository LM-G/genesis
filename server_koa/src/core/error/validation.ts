import { FunctionalError } from './functional';

export class ValidationError extends FunctionalError{
    constructor(message?: string, details?: any){
        super(message || 'Validation error', 422, details);
    }
}