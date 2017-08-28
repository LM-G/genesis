import {FunctionalError} from './functional';

export class DataNotFoundError extends FunctionalError{
    constructor(message?: string, details?: any){
        super(message || 'Ressource non trouvée', 404, details);
    }
}