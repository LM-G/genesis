import {FunctionalException} from './functional.exception';

export class DataNotFoundException extends FunctionalException{
    status = 404;
    message = 'Ressource non trouvée';
    constructor(message?: string){
        super();
        if(message){
            this.message = message;
        }
    }
}