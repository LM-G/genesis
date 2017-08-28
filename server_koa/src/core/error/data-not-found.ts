import {FunctionalError} from './functional';

export class DataNotFoundError extends FunctionalError{
    constructor(message?: string){
        super(message || 'Ressource non trouvée', 404);
    }
}